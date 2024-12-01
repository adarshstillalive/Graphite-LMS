import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export interface InstructorRequest {
  expertise: string[];
  qualifications: string[];
  additionalInfo: string[];
  isApproved: boolean;
  isRejected: boolean;
  rejectedReason?: string;
  createdAt: string;
}

const RequestDetails = (request: InstructorRequest) => {
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
  const [isQualificationsOpen, setIsQualificationsOpen] = useState(false);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

  const getStatusBadge = () => {
    if (request.isApproved) {
      return (
        <Badge className="bg-green-500 text-white">
          <CheckCircle className="w-4 h-4 mr-1" /> Approved
        </Badge>
      );
    } else if (request.isRejected) {
      return (
        <Badge className="bg-red-500 text-white">
          <XCircle className="w-4 h-4 mr-1" /> Rejected
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-yellow-500 text-white">
          <Clock className="w-4 h-4 mr-1" /> Pending
        </Badge>
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Instructor Request </CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>
          Submitted on{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(request.createdAt))}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Collapsible open={isExpertiseOpen} onOpenChange={setIsExpertiseOpen}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Expertise</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isExpertiseOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-disc list-inside mt-2">
              {request.expertise.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={isQualificationsOpen}
          onOpenChange={setIsQualificationsOpen}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Qualifications</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isQualificationsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-disc list-inside mt-2">
              {request.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={isAdditionalInfoOpen}
          onOpenChange={setIsAdditionalInfoOpen}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isAdditionalInfoOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-disc list-inside mt-2">
              {request.additionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {request.isRejected && request.rejectedReason && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Rejection Reason
            </h3>
            <p className="text-red-600">{request.rejectedReason}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          This request is currently{' '}
          {request.isApproved
            ? 'approved'
            : request.isRejected
              ? 'rejected'
              : 'under review'}
          .
        </p>
      </CardFooter>
    </Card>
  );
};

export default RequestDetails;
