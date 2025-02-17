import { compressPDF, decryptPDF, encryptPDF } from '.'

async function main() {
  await compressPDF({
    inFile: 'res/raw.pdf',
    outFile: 'res/compressed.pdf',
  })

  await encryptPDF({
    inFile: 'res/raw.pdf',
    outFile: 'res/encrypted.pdf',
    ownerPassword: 'DemoOwnerPassword',
    userPassword: 'DemoUserPassword',
  })

  await decryptPDF({
    inFile: 'res/encrypted.pdf',
    outFile: 'res/decrypted-user.pdf',
    password: 'DemoUserPassword',
  })

  await decryptPDF({
    inFile: 'res/encrypted.pdf',
    outFile: 'res/decrypted-owner.pdf',
    password: 'DemoOwnerPassword',
  })
}

main().catch(e => console.error(e))
