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
    return path.map((segment, index) => {
      linkPath += `/${segment}`;
      const isLast = index === path.length - 1;

      return (
        <React.Fragment key={index}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage>
                {segment === 'admin' ? 'home' : segment}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={linkPath}>
                  {segment === 'admin' ? 'home' : segment}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}{' '}
          {/* Place the separator outside of BreadcrumbItem */}
        </React.Fragment>
      );
    });
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
