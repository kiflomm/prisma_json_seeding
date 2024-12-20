import { PrismaClient } from '@prisma/client' 
import fs from 'fs/promises'

const prisma = new PrismaClient()

async function importBooks() {
  try {
    // Read the JSON file
    const jsonData = await fs.readFile('src/data_source/states.json', 'utf8')
    const data = JSON.parse(jsonData) 

    for (const item of data) {
      await prisma.state.upsert({
        where: { id: item.id },
        update: {
          country_id: item.country_id,
          name: item.name,
          iso2: item.iso2
        },
        create: item,
      })
      console.log(`Imported: ${item.name}`)
    }

  } catch (error) {
    console.error('Error importing books:', error)
  } finally {
    await prisma.$disconnect()
  }
}

importBooks()
