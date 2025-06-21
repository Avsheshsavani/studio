'use server';
/**
 * @fileOverview An AI flow for analyzing store receipts.
 *
 * - analyzeBill - A function that handles the bill analysis process.
 * - AnalyzeBillInput - The input type for the analyzeBill function.
 * - AnalyzeBillOutput - The return type for the analyzeBill function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnalyzeBillInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a store receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeBillInput = z.infer<typeof AnalyzeBillInputSchema>;

const AnalyzeBillOutputSchema = z.object({
  storeName: z.string().describe("The name of the store from the receipt."),
  transactionDate: z
    .string()
    .describe("The date of the transaction from the receipt in YYYY-MM-DD format."),
  items: z
    .array(
      z.object({
        description: z.string().describe("The description of the purchased item."),
        amount: z.number().describe("The price of the purchased item."),
      })
    )
    .describe("A list of all items purchased."),
});
export type AnalyzeBillOutput = z.infer<typeof AnalyzeBillOutputSchema>;

export async function analyzeBill(input: AnalyzeBillInput): Promise<AnalyzeBillOutput> {
  return analyzeBillFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBillPrompt',
  input: {schema: AnalyzeBillInputSchema},
  output: {schema: AnalyzeBillOutputSchema},
  prompt: `You are an expert receipt processing agent.
Your task is to analyze the provided image of a store receipt and extract key information.

Please extract the following:
1.  The name of the store.
2.  The date of the transaction. Please provide it in YYYY-MM-DD format.
3.  A list of all individual items purchased, along with their final price.

Return the extracted information in the required JSON format.

Receipt Image: {{media url=photoDataUri}}`,
});

const analyzeBillFlow = ai.defineFlow(
  {
    name: 'analyzeBillFlow',
    inputSchema: AnalyzeBillInputSchema,
    outputSchema: AnalyzeBillOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
