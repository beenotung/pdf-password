import { spawn } from 'child_process'

export function decryptPDF(options: {
  inFile: string
  outFile: string
  password: string
}) {
  return new Promise<void>((resolve, reject) => {
    let child = spawn('gs', [
      '-sDEVICE=pdfwrite',
      '-dBATCH',
      '-dNOPAUSE',
      '-q',
      `-sPDFPassword=${options.password}`,
      `-sOutputFile=${options.outFile}`,
      `-f`,
      options.inFile,
    ])

    let stdout = ''
    child.stdout.on('data', data => {
      stdout += data
    })

    let stderr = ''
    child.stderr.on('data', data => {
      stderr += data
    })

    child.on('close', async code => {
      let output = stdout + '\n' + stderr

      if (output.includes(' No such file ')) {
        reject(new PDFError(`input file not found`, code, stdout, stderr))
        return
      }

      if (
        output.includes('Could not open the file') &&
        output.includes('Unable to open the initial device')
      ) {
        reject(new PDFError(`output directory not found`, code, stdout, stderr))
        return
      }

      if (
        output.includes('Error: Password did not work') ||
        output.includes('Cannot decrypt PDF file')
      ) {
        reject(new PDFError(`Wrong password`, code, stdout, stderr))
        return
      }

      if (!code) {
        resolve()
        return
      }

      reject(new PDFError(`Failed to decrypt PDF`, code, stdout, stderr))
    })
  })
}

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
) {
  let ownerPassword =
    'ownerPassword' in options ? options.ownerPassword : options.password
  let userPassword =
    'userPassword' in options ? options.userPassword : options.password

  return new Promise<void>((resolve, reject) => {
    let child = spawn('gs', [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      '-dBATCH',
      '-dNOPAUSE',
      '-dQUIET',
      '-dNOPROMPT',
      `-sOwnerPassword=${ownerPassword}`,
      `-sUserPassword=${userPassword}`,
      `-sOutputFile=${options.outFile}`,
      options.inFile,
    ])

    let stdout = ''
    child.stdout.on('data', data => {
      stdout += data
    })

    let stderr = ''
    child.stderr.on('data', data => {
      stderr += data
    })

    child.on('close', async code => {
      let output = stdout + '\n' + stderr

      if (output.includes(' No such file ')) {
        reject(new PDFError(`input file not found`, code, stdout, stderr))
        return
      }

      if (
        output.includes('Could not open the file') &&
        output.includes('Unable to open the initial device')
      ) {
        reject(new PDFError(`output directory not found`, code, stdout, stderr))
        return
      }

      if (!code) {
        resolve()
        return
      }

      reject(new PDFError(`Failed to decrypt PDF`, code, stdout, stderr))
    })
  })
}

export function compressPDF(options: { inFile: string; outFile: string }) {
  return new Promise<void>((resolve, reject) => {
    let child = spawn('gs', [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      '-dBATCH',
      '-dNOPAUSE',
      '-dQUIET',
      '-dNOPROMPT',
      `-sOutputFile=${options.outFile}`,
      options.inFile,
    ])

    let stdout = ''
    child.stdout.on('data', data => {
      stdout += data
    })

    let stderr = ''
    child.stderr.on('data', data => {
      stderr += data
    })

    child.on('close', async code => {
      let output = stdout + '\n' + stderr

      if (output.includes(' No such file ')) {
        reject(new PDFError(`input file not found`, code, stdout, stderr))
        return
      }

      if (
        output.includes('Could not open the file') &&
        output.includes('Unable to open the initial device')
      ) {
        reject(new PDFError(`output directory not found`, code, stdout, stderr))
        return
      }

      if (!code) {
        resolve()
        return
      }

      reject(new PDFError(`Failed to decrypt PDF`, code, stdout, stderr))
    })
  })
}

export class PDFError extends Error {
  constructor(
    message: string,
    public code: number | null,
    public stdout: string,
    public stderr: string,
  ) {
    super(message)
  }
}
