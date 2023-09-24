// por conta da propriedade "noPropertyAccessFromIndexSignature": true no tsconfig.ts, eu preciso criar uma interface global do .env, ou isso ou usar process.env.[variável]
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly PORT: number;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
