// src/app/actions.ts
'use server';

import { suggestFAQTopics } from '@/ai/flows/suggest-faq-topics';
import { z } from 'zod';

const formSchema = z.object({
  userInput: z.string().min(10, {
    message: 'Please describe your question in at least 10 characters.',
  }),
});

type SuggestionState = {
  message: string;
  suggestions?: string[];
  errors?: {
    userInput?: string[];
  };
};

export async function getFaqSuggestions(
  prevState: SuggestionState,
  formData: FormData
): Promise<SuggestionState> {
  const validatedFields = formSchema.safeParse({
    userInput: formData.get('userInput'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { suggestedTopics } = await suggestFAQTopics({
      userInput: validatedFields.data.userInput,
    });
    return { message: 'Success', suggestions: suggestedTopics };
  } catch (error) {
    console.error('Error getting FAQ suggestions:', error);
    return {
      message: 'An error occurred while fetching suggestions. Please try again later.',
    };
  }
}
