# pdf-password

Encrypt, Decrypt and Compress PDF files using Ghostscript

[![npm Package Version](https://img.shields.io/npm/v/pdf-password)](https://www.npmjs.com/package/pdf-password)

## Features

- Compress PDF without visible quality loss
- Encrypt PDF with owner and user password
- Decrypt PDF with password
- Typescript support

## Installation

```bash
npm install pdf-password
```

You can also install `pdf-password` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

```typescript
import { compressPDF, decryptPDF, encryptPDF } from 'pdf-password'

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
```

## Typescript Signature

**Core Functions**:

```typescript
export function decryptPDF(options: {
  inFile: string
  outFile: string
  password: string
}): Promise<void>

export function encryptPDF(
  options: {
    inFile: string
    outFile: string
  } & (
    | {
        ownerPassword: string
        userPassword: string
      }
    | {
        password: string
      }
  ),
): Promise<void>

export function compressPDF(options: {
  inFile: string
  outFile: string
}): Promise<void>
```

**Error Class**:

```typescript
export class PDFError extends Error {
  code: number | null
  stdout: string
  stderr: string
}
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
