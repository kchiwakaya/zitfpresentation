import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const imagePath = searchParams.get('path')
  
  if (!imagePath) {
    return new NextResponse('Missing path parameter', { status: 400 })
  }
  
  try {
    const file = await readFile(imagePath)
    
    // Determine content type based on extension
    const ext = path.extname(imagePath).toLowerCase()
    let contentType = 'image/png'
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
    else if (ext === '.svg') contentType = 'image/svg+xml'
    else if (ext === '.gif') contentType = 'image/gif'
    else if (ext === '.webp') contentType = 'image/webp'
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving local image:', error)
    return new NextResponse('Image not found', { status: 404 })
  }
}
