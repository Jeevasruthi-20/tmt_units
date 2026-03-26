import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitOfflineClassContact } from '@/lib/api';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\s/g, ''));
const validateName = (name) => /^[a-zA-Z\s]{2,}$/.test(name.trim());

export default function OfflineClassForm({ classes, initialClassId }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classType: initialClassId || '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must contain only letters and be at least 2 characters';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be a valid phone number (at least 10 digits)';
    }

    if (!formData.classType) {
      newErrors.classType = 'Please select a class';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitOfflineClassContact(formData);
      toast({
        title: 'Contact Request Submitted!',
        description: "We'll reach out to you soon with offline class details and schedules.",
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        classType: '',
        address: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit contact request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="offline-name">Full Name *</Label>
          <Input
            id="offline-name"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="offline-email">Email *</Label>
          <Input
            id="offline-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="offline-phone">Phone Number *</Label>
          <Input
            id="offline-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="offline-classType">Select Class *</Label>
          <Select
            value={formData.classType}
            onValueChange={(value) => handleInputChange('classType', value)}
            required
          >
            <SelectTrigger id="offline-classType" className={errors.classType ? 'border-red-500' : ''}>
              <SelectValue placeholder="Choose a class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.classType && <p className="text-sm text-red-500">{errors.classType}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Your city/area"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder="Any specific requirements or questions?"
          rows={4}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Contact Request'}
      </Button>
    </form>
  );
}

