'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getFaqSuggestions } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Loader2, ChevronsRight } from 'lucide-react';

const initialState = {
  message: '',
  suggestions: [],
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
         <Lightbulb className="mr-2 h-4 w-4" />
          Suggest Topics
        </>
      )}
    </Button>
  );
}

export default function FaqSuggester() {
  const [state, formAction] = useFormState(getFaqSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Success' && !state.errors) {
      toast({
        variant: 'destructive',
        title: 'AI Assistant Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="sticky top-24 bg-card/90 backdrop-blur-sm shadow-lg border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="flex-shrink-0 bg-accent/10 p-2 rounded-md">
                <Lightbulb className="h-6 w-6 text-accent" />
            </div>
            <div>
                <CardTitle className="font-headline text-xl text-primary">AI Topic Assistant</CardTitle>
                <CardDescription>Can't find an answer? Let our AI help.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userInput">Describe your question or issue</Label>
            <Textarea
              id="userInput"
              name="userInput"
              placeholder="e.g., 'Do you do custom WebGL development?' or 'Can you build an educational app?'"
              rows={4}
              required
              className="bg-background focus:border-accent"
            />
            {state?.errors?.userInput && (
              <p className="text-sm font-medium text-destructive">{state.errors.userInput[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>

        {state.suggestions && state.suggestions.length > 0 && (
          <div className="mt-6">
            <h4 className="font-headline font-semibold mb-3 text-primary">Suggested Topics:</h4>
            <ul className="space-y-2">
              {state.suggestions.map((topic, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                    <ChevronsRight className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                    <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
