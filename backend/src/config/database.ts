import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import dotenv from 'dotenv';
import { AdminService } from '../services/AdminService';

// 加载环境变量
dotenv.config();

const DB_PATH = process.env.DB_PATH || './database.db';

// 数据库连接池管理类
class DatabasePool {
  private static instance: DatabasePool;
  private dbInstance: Database | null = null;
  private isInitialized: boolean = false;

  private constructor() {}

  // 获取单例实例
  public static getInstance(): DatabasePool {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool();
    }
    return DatabasePool.instance;
  }

  // 获取数据库连接
  public async getConnection(): Promise<Database> {
    if (!this.dbInstance) {
      this.dbInstance = await open({
        filename: DB_PATH,
        driver: sqlite3.Database,
        mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX,
      });
      
      // 确保数据库使用 UTF-8 编码
      await this.dbInstance.exec('PRAGMA encoding = "UTF-8";');
    }
    return this.dbInstance;
  }

  // 关闭数据库连接
  public async closeConnection(): Promise<void> {
    if (this.dbInstance) {
      await this.dbInstance.close();
      this.dbInstance = null;
      this.isInitialized = false;
    }
  }

  // 辅助方法：确保列存在
  private async ensureColumn(db: Database, tableName: string, columnName: string, columnType: string): Promise<void> {
    try {
      const tableInfo = await db.all(`PRAGMA table_info(${tableName})`);
      const columnExists = tableInfo.some((col: any) => col.name === columnName);
      
      if (!columnExists) {
        console.log(`Adding column ${columnName} to table ${tableName}`);
        await db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`);
      }
    } catch (error) {
      console.error(`Error ensuring column ${columnName} in table ${tableName}:`, error);
    }
  }

  // 初始化数据库
  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    const db = await this.getConnection();

    // 创建博客表
    await db.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        category TEXT
      );
    `);

    // 创建教程表
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tutorials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        category TEXT,
        difficulty TEXT,
        image TEXT
      );
    `);

    // 创建工具表
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        url TEXT NOT NULL,
        category TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 创建分类表
    await db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 创建管理员表
    await db.exec(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `);
    
    // 检查并添加缺失的列 (针对旧表结构迁移)
    await this.ensureColumn(db, 'tutorials', 'image', 'TEXT');
    await this.ensureColumn(db, 'tools', 'category', 'TEXT');
    await this.ensureColumn(db, 'blog_posts', 'category', 'TEXT');
    await this.ensureColumn(db, 'blog_posts', 'tags', 'TEXT');

    // 初始化默认管理员
    await AdminService.initDefaultAdmin();

    this.isInitialized = true;
    console.log('Database initialized successfully');
  }
}

export const getDatabase = async (): Promise<Database> => {
  const pool = DatabasePool.getInstance();
  return pool.getConnection();
};

export const initializeDatabase = async (): Promise<void> => {
  const pool = DatabasePool.getInstance();
  await pool.initialize();
};

export const closeDatabase = async (): Promise<void> => {
  const pool = DatabasePool.getInstance();
  await pool.closeConnection();
};
