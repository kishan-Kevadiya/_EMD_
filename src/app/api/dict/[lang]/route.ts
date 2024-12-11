import { NextRequest, NextResponse } from 'next/server'
import type { Locale } from '../../../../../i18n.config'

const dictionaries = {
  en: () => import('../../../../../messages/en.json').then(module => module.default),
  es: () => import('../../../../../messages/es.json').then(module => module.default)
}

export async function GET(
  request: NextRequest,
  { params }: { params: { lang: string } }
) {
  const lang = params.lang as Locale
  console.log('Requested language:', lang)

  try {
    if (!dictionaries[lang]) {
      throw new Error(`Unsupported language: ${lang}`)
    }

    const dictionary = await dictionaries[lang]()
    return NextResponse.json(dictionary)
  } catch (error) {
    console.error('Error loading dictionary:', error)
    return NextResponse.json(
      { error: 'Failed to load dictionary' },
      { status: 500 }
    )
  }
}

