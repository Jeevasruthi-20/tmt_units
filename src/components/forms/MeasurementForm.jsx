import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitMeasurementOrder } from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^[\d\s\-\+\(\)]{10,}$/.test(phone.replace(/\s/g, ''));
const validateName = (name) => /^[a-zA-Z\s]{2,}$/.test(name.trim());
const validateNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

export default function MeasurementForm({ garmentType, fields }) {
  const { toast } = useToast();
  const [measurementUnit, setMeasurementUnit] = useState('inches');
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [designFile, setDesignFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Design file must be less than 5MB',
          variant: 'destructive',
        });
        e.target.value = '';
        return;
      }
      setDesignFile(file);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Conversion helper
  const convertToInches = (value, unit) => {
    if (!value) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    return unit === 'cm' ? (numValue / 2.54).toFixed(2) : numValue.toString();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(formData.customerName)) {
      newErrors.customerName = 'Name must contain only letters and be at least 2 characters';
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be a valid phone number (at least 10 digits)';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (formData[field.name] && !validateNumber(formData[field.name])) {
        newErrors[field.name] = `${field.label} must be a positive number`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const measurements = {
        unit: measurementUnit,
      };
      fields.forEach((field) => {
        if (formData[field.name]) {
          // Store both the entered value and converted to inches for backend
          measurements[field.name] = formData[field.name];
          measurements[`${field.name}_inches`] = convertToInches(formData[field.name], measurementUnit);
        }
      });

      // Prepare FormData for multipart upload
      const data = new FormData();
      data.append('garmentType', garmentType);
      data.append('customerName', formData.customerName);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      data.append('notes', formData.notes);
      data.append('measurements', JSON.stringify(measurements));
      
      if (designFile) {
        data.append('designFile', designFile);
      }

      await submitMeasurementOrder(data);

      toast({
        title: 'Order Submitted Successfully!',
        description: "We've received your measurements and design. We'll contact you soon to confirm your order.",
      });

      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        notes: '',
        ...fields.reduce((acc, field) => {
          acc[field.name] = '';
          return acc;
        }, {}),
      });
      setDesignFile(null);
      // Reset file input manually if needed, but since it's uncontrolled or controlled by state it might be easier to just reset the component or let it be.
      // Easiest way in React to reset file input is to give it a key or use a ref. 
      // For simplicity here, we'll just set designFile to null.
      setErrors({});
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Details */}
      <div className="space-y-4">
        <h3 className="font-serif font-semibold text-xl text-foreground">Customer Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              required
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Enter your name"
              className={errors.customerName ? 'border-red-500' : ''}
            />
            {errors.customerName && <p className="text-sm text-red-500">{errors.customerName}</p>}
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* Measurements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-semibold text-xl text-foreground">
            Measurements
          </h3>
          <div className="flex items-center gap-2">
            <Label htmlFor="unit" className="text-sm text-muted-foreground">Unit:</Label>
            <Select value={measurementUnit} onValueChange={setMeasurementUnit}>
              <SelectTrigger id="unit" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inches">Inches</SelectItem>
                <SelectItem value="cm">Centimeters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label} {field.required && '*'}
              </Label>
              <div className="relative">
                <Input
                  id={field.name}
                  type="number"
                  step="0.1"
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className={`pr-20 ${errors[field.name] ? 'border-red-500' : ''}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {measurementUnit === 'inches' ? 'in' : 'cm'}
                </span>
              </div>
              {errors[field.name] && <p className="text-sm text-red-500">{errors[field.name]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Custom Design */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="designFile" className="font-serif font-semibold text-lg text-foreground">
            Upload Your Own Design (Optional)
          </Label>
          <p className="text-sm text-muted-foreground">
            Have a specific style in mind? Upload a photo or PDF of your desired design.
          </p>
        </div>
        <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center gap-3 bg-muted/30 hover:bg-muted/50 transition-colors">
          <Input
            id="designFile"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="max-w-xs cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            Accepted formats: JPG, PNG, PDF (Max 5MB)
          </p>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="Any specific design preferences, fabric choices, or special requirements..."
          rows={4}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Order'}
      </Button>
    </form>
  );
}
