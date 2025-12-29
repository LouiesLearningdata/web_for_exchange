import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@insforge/sdk';

// 创建insforge客户端
const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://zd8jv2d5.us-east.insforge.app',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
});

// 定义AI识别的返回数据结构
interface AICampusInfo {
  name?: string;
  location?: string;
  semester?: string;
  recommended_course?: string;
  course_info?: string;
  course_assessment?: string;
  credit_transfer?: string;
  favorite?: string;
  complaint?: string;
  learning_experience?: string;
  special_thanks?: string;
  visa?: string;
  preparation?: string;
  flight?: string;
  items_needed?: string;
  other_procedures?: string;
  accommodation?: string;
  accommodation_life?: string;
  dining?: string;
  bank?: string;
  insurance?: string;
  others?: string;
  clubs?: string;
  transportation?: string;
  travel?: string;
  entertainment?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: '缺少图片数据' },
        { status: 400 }
      );
    }

    // 构建AI提示词
    const systemPrompt = `你是一个专业的院校信息分析助手。请仔细分析用户上传的图片，提取其中包含的院校相关信息。

请按照以下JSON格式返回识别结果，只返回JSON数据，不要有其他文字：

{
  "name": "学校名称（如果图片中有学校logo、名称标识等）",
  "location": "学校详细地址或位置信息",
  "semester": "学期安排信息（如学期开始结束时间、学期制度等）",
  "recommended_course": "推荐的课程或专业",
  "course_info": "课程详细信息（课程名称、内容、要求等）",
  "course_assessment": "课程评估方式（考试、作业、项目等）",
  "credit_transfer": "学分转换相关信息",
  "favorite": "最喜欢的方面或特色",
  "complaint": "存在的问题或建议改进的地方",
  "learning_experience": "学习体验和感受",
  "special_thanks": "特别感谢的人或机构",
  "visa": "签证相关信息",
  "preparation": "行前准备事项",
  "flight": "航班或交通信息",
  "items_needed": "必备物品清单",
  "other_procedures": "其他需要办理的手续",
  "accommodation": "住宿相关信息",
  "accommodation_life": "住宿生活体验",
  "dining": "餐饮相关信息",
  "bank": "银行和金融服务",
  "insurance": "保险相关信息",
  "others": "其他生活信息",
  "clubs": "社团和活动信息",
  "transportation": "交通方式信息",
  "travel": "旅行和周边游玩信息",
  "entertainment": "娱乐活动信息"
}

注意事项：
1. 只提取图片中确实存在的信息，不要虚构
2. 如果某个字段在图片中没有相关信息，请留空
3. 尽量保持信息的准确性和完整性
4. 信息要简洁明了，避免冗长`;

    // 调用insforge AI API
    const completion = await insforge.ai.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: '请分析这张图片中的院校信息：'
            },
            {
              type: 'image_url',
              image_url: {
                url: imageBase64
              }
            }
          ]
        }
      ],
      temperature: 0.1, // 较低的温度以获得更稳定的结果
      maxTokens: 2000
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('AI未返回有效结果');
    }

    // 尝试解析AI返回的JSON数据
    let campusInfo: AICampusInfo;
    try {
      // 尝试从响应中提取JSON（AI可能返回带解释的文本）
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        campusInfo = JSON.parse(jsonMatch[0]);
      } else {
        campusInfo = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error('JSON解析错误:', parseError);
      console.log('AI原始响应:', aiResponse);
      
      // 如果解析失败，返回空对象
      campusInfo = {};
    }

    return NextResponse.json({
      success: true,
      data: campusInfo,
      rawResponse: aiResponse // 用于调试
    });

  } catch (error) {
    console.error('AI分析错误:', error);
    return NextResponse.json(
      { 
        error: 'AI分析失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}
