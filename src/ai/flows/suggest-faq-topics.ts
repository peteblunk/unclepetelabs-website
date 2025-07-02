// src/ai/flows/suggest-faq-topics.ts
'use server';

/**
 * @fileOverview FAQ topic suggestion AI agent.
 *
 * - suggestFAQTopics - A function that suggests FAQ topics based on user input.
 * - SuggestFAQTopicsInput - The input type for the suggestFAQTopics function.
 * - SuggestFAQTopicsOutput - The return type for the suggestFAQTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFAQTopicsInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input, question, or description of their issue.'),
});
export type SuggestFAQTopicsInput = z.infer<typeof SuggestFAQTopicsInputSchema>;

const SuggestFAQTopicsOutputSchema = z.object({
  suggestedTopics: z
    .array(z.string())
    .describe('An array of suggested FAQ topics that are relevant to the user input.'),
});
export type SuggestFAQTopicsOutput = z.infer<typeof SuggestFAQTopicsOutputSchema>;

export async function suggestFAQTopics(input: SuggestFAQTopicsInput): Promise<SuggestFAQTopicsOutput> {
  return suggestFAQTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFAQTopicsPrompt',
  input: {schema: SuggestFAQTopicsInputSchema},
  output: {schema: SuggestFAQTopicsOutputSchema},
  prompt: `You are an AI assistant for "Uncle Pete's Labs". We are a creative studio that produces games, websites, educational materials, and fun interactive experiences.

  Given the following user input, suggest 3-5 relevant FAQ topics that we might already have an answer for on our website. The goal is to guide the user to an existing answer.

  User Input: {{{userInput}}}

  Ensure that the output is an array of strings. Be brief and to the point.
  Do not give any explanations.
  `,
});

const suggestFAQTopicsFlow = ai.defineFlow(
  {
    name: 'suggestFAQTopicsFlow',
    inputSchema: SuggestFAQTopicsInputSchema,
    outputSchema: SuggestFAQTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
