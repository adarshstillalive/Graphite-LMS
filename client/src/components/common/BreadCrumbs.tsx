import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter((segment) => segment); // Remove empty segments

  const generateBreadcrumbs = () => {
    let linkPath = '';
    const breadcrumbs = [];

    for (let i = 0; i < path.length; i++) {
      const segment = path[i];
      const isId = /\d/.test(segment); // Check if the segment contains any numbers

      // If the current segment is an ID, skip the previous one
      if (isId && breadcrumbs.length > 0) {
        breadcrumbs.pop(); // Remove the last breadcrumb
      }

      linkPath += `/${segment}`;

      const isLast = i === path.length - 1;

      breadcrumbs.push(
        <React.Fragment key={i}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>{segment}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={linkPath}>{segment}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    }

    return breadcrumbs;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
