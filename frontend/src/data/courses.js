import { Scissors, Sparkles, Heart } from 'lucide-react';

export const courses = [
    {
        id: 'tailoring',
        title: 'Tailoring Course (Basic + Advanced)',
        description: 'Complete knowledge to confidently stitch and design garments from basic to advanced level.',
        icon: Scissors,
        color: 'from-primary to-amber-600',
        features: [
            'Basic tailoring techniques',
            'Advanced garment construction',
            'Practical training for mastering skills',
            'Pattern making and design',
        ],
        duration: '6 Months',
        fee: '₹1000 per month',
        outcome: 'Students will gain complete knowledge to confidently stitch and design garments from basic to advanced level.',
        image: '/images/tailoring.jpg',
        curriculum: [
            {
                title: 'Basic Tailoring Course',
                duration: '3 Months (Weekly 6 hours)',
                topics: [
                    'Machine Practice',
                    'Pillow cover',
                    'Slip',
                    'Shimmy',
                    'Simple Frock',
                    'Umbrella Inskirt',
                    'Pattu Pavadai Set',
                    'Box Pleated Skirt & Top',
                    'Chudi with Normal Pant',
                    'Normal Blouse'
                ]
            },
            {
                title: 'Advance Tailoring Course',
                items: [
                    {
                        subtitle: 'Kurti',
                        topics: [
                            'Straight cut',
                            'Anarkali',
                            'A-line',
                            'Umbrella (Semi flared & Full flared)'
                        ]
                    },
                    {
                        subtitle: 'Pant',
                        topics: [
                            'Normal',
                            'Gathering',
                            'Patiala',
                            'Palazzo',
                            'Straight Pant'
                        ]
                    },
                    {
                        subtitle: 'Blouse Training (3 Months Specialization)',
                        topics: [
                            'Normal Blouse',
                            'Lining Blouse',
                            'Straight Cut & Cross Cut',
                            'Princess Cut',
                            'Back Open',
                            'Katori Pattern',
                            'Designer Patterns',
                            'All kinds of trendy Neck & Sleeve Patterns'
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'aari',
        title: 'Aari Work Course',
        description: 'Master decorative Aari embroidery techniques suitable for designer wear.',
        icon: Sparkles,
        color: 'from-secondary to-teal-600',
        features: [
            'Basic Level: Stitches & Thread work',
            'Advanced Level: Material, Bead & Zardozi work',
            'Materials provided by institute',
            'Suitable for designer wear creation',
        ],
        duration: '2 Months',
        fee: '₹5000 (Total)',
        outcome: 'Students will master decorative Aari embroidery techniques suitable for designer wear.',
        image: '/images/aari.jpg',
        curriculum: [
            {
                title: 'Basic Level',
                topics: ['Thread work', 'Basic Stitches', 'Chain Stitch', 'Knot Stitch']
            },
            {
                title: 'Advanced Level',
                topics: ['Bead work', 'Zardozi work', 'Chamki work', 'Cut work', 'Patch work']
            }
        ]
    },
    {
        id: 'embroidery',
        title: 'Embroidery Course',
        description: 'Develop strong embroidery skills for handwork and creative designs.',
        icon: Heart,
        color: 'from-pink-500 to-rose-600',
        features: [
            'Training in 40 different stitches',
            'Hands-on practical sessions',
            'Design planning and execution',
            'Creative pattern creation',
        ],
        duration: '2 Months',
        fee: '₹3000 (Total)',
        outcome: 'Students will develop strong embroidery skills for handwork and creative designs.',
        image: '/images/embroidery.jpg',
        curriculum: [
            {
                title: 'Course Content',
                topics: [
                    'Training in 40 different stitches',
                    'Hands-on practical sessions',
                    'Design planning and execution',
                    'Creative pattern creation',
                    'Hand Embroidery Basics'
                ]
            }
        ]
    },
];
