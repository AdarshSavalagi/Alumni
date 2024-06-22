import axios from 'axios';
import cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest)  {
  const url = 'https://www.sitmng.ac.in/SIT/News-Events?newsEvents=3';

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const newsTitles: string[] = [];
    const newsDates: string[] = [];
    const newsImages: string[] = [];

    $('div.card-body > div.m-b-20 > h4 > a').each((index, element) => {
      newsTitles.push($(element).text().trim());
    });

    $('div.card-body > div.m-b-20 > p').each((index, element) => {
      newsDates.push($(element).text().trim());
    });

    $('div.card-body > div.sg-img-wrap > img').each((index, element) => {
      newsImages.push($(element).attr('src') || '');
    });

    return NextResponse.json({
      newsTitles,
      newsDates,
      newsImages,
    },{status:200});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scrape news data' },{status:500});
  }
};
