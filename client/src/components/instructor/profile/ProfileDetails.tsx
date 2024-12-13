import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { IInstructorPopulated } from '@/interfaces/Instructor';

interface ProfileDetailsProps {
  instructorData: IInstructorPopulated;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (data: ProfileDetailsProps['instructorData']) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  instructorData,
  isEditing,
  onEdit,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(instructorData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'expertise' | 'education' | 'socialLinks'
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="expertise">Expertise (comma-separated)</Label>
          <Input
            id="expertise"
            name="expertise"
            value={formData.expertise.join(', ')}
            onChange={(e) => handleArrayChange(e, 'expertise')}
            required
          />
        </div>
        <div>
          <Label htmlFor="education">Education (comma-separated)</Label>
          <Input
            id="education"
            name="education"
            value={formData.education.join(', ')}
            onChange={(e) => handleArrayChange(e, 'education')}
            required
          />
        </div>
        <div>
          <Label htmlFor="socialLinks">Social Links (comma-separated)</Label>
          <Input
            id="socialLinks"
            name="socialLinks"
            value={formData.socialLinks.join(', ')}
            onChange={(e) => handleArrayChange(e, 'socialLinks')}
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {instructorData.userId.firstName + ' ' + instructorData.userId.lastName}
      </h2>
      <p className="text-gray-600">{instructorData.userId.email}</p>
      <div>
        <h3 className="text-lg font-semibold">About</h3>
        {/* <p>{instructorData.bio}</p> */}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Expertise</h3>
        <ul className="list-disc list-inside">
          {instructorData.expertise &&
            instructorData.expertise.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Education</h3>
        <ul className="list-disc list-inside">
          {instructorData.qualifications &&
            instructorData.qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Social Links</h3>
        <ul className="list-disc list-inside">
          {instructorData.socialLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={onEdit}>Edit Profile</Button>
    </div>
  );
};

export default ProfileDetails;
