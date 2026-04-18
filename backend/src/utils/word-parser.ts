
import mammoth from 'mammoth';
import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * 将 Word 文档转换为 Markdown
 * @param filePath Word 文件路径
 * @returns Markdown 内容
 */
export const parseWordToMarkdown = async (filePath: string): Promise<string> => {
  const uploadDir = path.join(__dirname, '../../public/uploads');
  
  // 确保上传目录存在
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 配置 mammoth 选项
  const options = {
    convertImage: mammoth.images.imgElement(async (image: any) => {
      console.log('Found image in Word document:', image.contentType);
      const buffer = await image.read();
      
      // 获取图片扩展名
      let extension = 'png'; // 默认
      if (image.contentType) {
        const parts = image.contentType.split('/');
        if (parts.length > 1) {
          extension = parts[1];
        }
      }
      
      // 生成文件名
      const filename = `${uuidv4()}.${extension}`;
      const imagePath = path.join(uploadDir, filename);
      
      // 写入文件
      await fs.promises.writeFile(imagePath, buffer);
      console.log('Saved image to:', imagePath);
      
      // 返回图片 URL
      return {
        src: `/uploads/${filename}`
      };
    })
  };

  try {
    // 转换为 HTML
    const result = await mammoth.convertToHtml({ path: filePath }, options);
    const html = result.value;
    console.log('Generated HTML length:', html.length);
    // console.log('Generated HTML preview:', html.substring(0, 500));
    
    // 转换为 Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });

    // 添加自定义图片处理规则，确保图片不被过滤
    turndownService.addRule('image', {
      filter: 'img',
      replacement: function (content, node) {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') || '';
        const title = node.getAttribute('title') || '';
        const titlePart = title ? ' "' + title + '"' : '';
        return src ? `\n![${alt}](${src}${titlePart})\n` : '';
      }
    });
    
    const markdown = turndownService.turndown(html);
    console.log('Generated Markdown length:', markdown.length);
    
    return markdown;
  } catch (error) {
    console.error('Error parsing Word document:', error);
    throw error;
  }
};
