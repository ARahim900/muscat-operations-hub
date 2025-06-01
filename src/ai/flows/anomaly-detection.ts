'use server';

/**
 * @fileOverview Anomaly detection AI agent for identifying unusual patterns in operational data.
 *
 * - detectAnomaly - A function that handles the anomaly detection process.
 * - AnomalyDetectionInput - The input type for the detectAnomaly function.
 * - AnomalyDetectionOutput - The return type for the detectAnomaly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnomalyDetectionInputSchema = z.object({
  dataType: z
    .enum(['electricity', 'water', 'stp'])
    .describe('The type of data to analyze: electricity, water, or stp.'),
  data: z.string().describe('The operational data to analyze.'),
  historicalData: z.string().optional().describe('Historical data for comparison.'),
});
export type AnomalyDetectionInput = z.infer<typeof AnomalyDetectionInputSchema>;

const AnomalyDetectionOutputSchema = z.object({
  isAnomaly: z.boolean().describe('Whether or not an anomaly is detected.'),
  explanation: z
    .string()
    .describe('The explanation of the anomaly, if any, or null if no anomaly is detected.'),
});
export type AnomalyDetectionOutput = z.infer<typeof AnomalyDetectionOutputSchema>;

export async function detectAnomaly(input: AnomalyDetectionInput): Promise<AnomalyDetectionOutput> {
  return anomalyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'anomalyDetectionPrompt',
  input: {schema: AnomalyDetectionInputSchema},
  output: {schema: AnomalyDetectionOutputSchema},
  prompt: `You are an expert operations analyst specializing in detecting anomalies in operational data.

You will analyze the provided data and determine if there is an anomaly, using historical data if provided.

Data Type: {{{dataType}}}
Data: {{{data}}}
Historical Data (if available): {{{historicalData}}}

Based on the data, determine if there is an anomaly.  If there is, explain why. If not, set isAnomaly to false and provide a null value for the explanation.
`,
});

const anomalyDetectionFlow = ai.defineFlow(
  {
    name: 'anomalyDetectionFlow',
    inputSchema: AnomalyDetectionInputSchema,
    outputSchema: AnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
