import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitOnlineClassEnrollment } from '@/lib/api';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\s/g, ''));
const validateName = (name) => /^[a-zA-Z\s]{2,}$/.test(name.trim());

export default function OnlineClassForm({ classes, initialClassId }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    classType: initialClassId || '',
    preferredDate: '',
    preferredTime: '',
  });
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM',
  ];

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

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a time slot';
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
      await submitOnlineClassEnrollment(formData);
      toast({
        title: 'Enrollment Request Submitted!',
        description: "We'll contact you soon to confirm your online class schedule.",
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        classType: '',
        preferredDate: '',
        preferredTime: '',
      });
      setErrors({});
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit enrollment. Please try again.',
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
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
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
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
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
          <Label htmlFor="classType">Select Class *</Label>
          <Select
            value={formData.classType}
            onValueChange={(value) => handleInputChange('classType', value)}
            required
          >
            <SelectTrigger id="classType" className={errors.classType ? 'border-red-500' : ''}>
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

        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Start Date *</Label>
          <Input
            id="preferredDate"
            type="date"
            required
            value={formData.preferredDate}
            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={errors.preferredDate ? 'border-red-500' : ''}
          />
          {errors.preferredDate && <p className="text-sm text-red-500">{errors.preferredDate}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred Time Slot *</Label>
          <Select
            value={formData.preferredTime}
            onValueChange={(value) => handleInputChange('preferredTime', value)}
            required
          >
            <SelectTrigger id="preferredTime" className={errors.preferredTime ? 'border-red-500' : ''}>
              <SelectValue placeholder="Choose time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.preferredTime && <p className="text-sm text-red-500">{errors.preferredTime}</p>}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Online Class Request'}
      </Button>
    </form>
  );
}

