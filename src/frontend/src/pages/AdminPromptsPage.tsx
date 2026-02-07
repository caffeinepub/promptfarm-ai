import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useAddPrompt } from '../hooks/useQueries';
import { PromptCategory } from '../backend';
import { CATEGORIES } from '../components/categories/categoryConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Shield, Plus, AlertCircle } from 'lucide-react';
import Seo from '../components/seo/Seo';
import AuthButton from '../components/auth/AuthButton';

interface FormData {
  title: string;
  description: string;
  fullText: string;
  category: PromptCategory | '';
  tags: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  fullText?: string;
  category?: string;
}

export default function AdminPromptsPage() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin, isFetched } = useIsCallerAdmin();
  const addPromptMutation = useAddPrompt();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    fullText: '',
    category: '',
    tags: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const isAuthenticated = !!identity;

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.fullText.trim()) {
      newErrors.fullText = 'Prompt text is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Parse tags: split by comma, trim whitespace, filter empty strings
    const tagsArray = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const promptRecord = {
      id: BigInt(0), // Placeholder, backend assigns real ID
      title: formData.title.trim(),
      description: formData.description.trim(),
      fullText: formData.fullText.trim(),
      category: formData.category as PromptCategory,
      tags: tagsArray,
      isPopular: false,
      isNew: false,
      isPremium: false,
    };

    try {
      await addPromptMutation.mutateAsync(promptRecord);
      toast.success('Prompt added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        fullText: '',
        category: '',
        tags: '',
      });
      setErrors({});
      setShowForm(false);
    } catch (error: any) {
      console.error('Failed to add prompt:', error);
      
      // Check if it's an authorization error
      if (error.message && error.message.includes('Unauthorized')) {
        toast.error('You must be an admin to add prompts');
      } else {
        toast.error('Failed to add prompt. Please try again.');
      }
    }
  };

  // Handle input changes
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Loading state
  if (!isAuthenticated) {
    return (
      <>
        <Seo title="Admin - Prompt Management" description="Admin panel for managing prompts" />
        <div className="container py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Access Required
              </CardTitle>
              <CardDescription>Please log in to access the admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <AuthButton />
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (isCheckingAdmin) {
    return (
      <>
        <Seo title="Admin - Prompt Management" description="Admin panel for managing prompts" />
        <div className="container py-12">
          <div className="text-center">
            <div className="animate-pulse text-muted-foreground">Checking permissions...</div>
          </div>
        </div>
      </>
    );
  }

  // Unauthorized state
  if (isFetched && !isAdmin) {
    return (
      <>
        <Seo title="Admin - Prompt Management" description="Admin panel for managing prompts" />
        <div className="container py-12">
          <Card className="max-w-md mx-auto border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Access Denied
              </CardTitle>
              <CardDescription>
                You do not have permission to access this page. Only administrators can manage prompts.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </>
    );
  }

  // Admin authorized - show the form
  return (
    <>
      <Seo title="Admin - Prompt Management" description="Admin panel for managing prompts" />
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Admin Panel
          </h1>
          <p className="text-lg text-muted-foreground">Manage prompts and content</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Prompt Management</CardTitle>
            <CardDescription>Add new prompts to the library</CardDescription>
          </CardHeader>
          <CardContent>
            {!showForm ? (
              <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Prompt
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter prompt title"
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter a brief description"
                    rows={3}
                    className={errors.description ? 'border-destructive' : ''}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                </div>

                {/* Prompt Text */}
                <div className="space-y-2">
                  <Label htmlFor="fullText">
                    Prompt Text <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="fullText"
                    value={formData.fullText}
                    onChange={(e) => handleChange('fullText', e.target.value)}
                    placeholder="Enter the full prompt text"
                    rows={6}
                    className={errors.fullText ? 'border-destructive' : ''}
                  />
                  {errors.fullText && (
                    <p className="text-sm text-destructive">{errors.fullText}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category', value)}
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.key} value={cat.key}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (optional)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleChange('tags', e.target.value)}
                    placeholder="Enter tags separated by commas (e.g., creative, professional, modern)"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple tags with commas
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={addPromptMutation.isPending}
                    className="flex-1 sm:flex-none"
                  >
                    {addPromptMutation.isPending ? 'Adding...' : 'Add Prompt'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({
                        title: '',
                        description: '',
                        fullText: '',
                        category: '',
                        tags: '',
                      });
                      setErrors({});
                    }}
                    disabled={addPromptMutation.isPending}
                  >
                    Cancel
                  </Button>
                </div>

                {addPromptMutation.isError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Failed to add prompt. Please try again.
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
