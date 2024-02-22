var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bundle } from '@redocly/openapi-cli';
function generateDocumentation() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Path to your OpenAPI Specification file
            const specPath = './swaggerDoc/swagger-output.yaml';
            // Generate documentation
            const output = yield bundle({
                input: specPath,
                output: 'redoc-static.html', // Output HTML file
                outputFormat: 'html',
            });
            console.log('API documentation generated successfully!');
        }
        catch (error) {
            console.error('Error generating API documentation:', error);
        }
    });
}
generateDocumentation();
