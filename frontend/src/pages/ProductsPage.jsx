import React from 'react';
import { ProductTitleList } from '../components/ProductTitleList.jsx';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { StatusMessage } from '../components/StatusMessage.jsx';
import { useAsyncResource } from '../hooks/useAsyncResource.js';
import { ApiErrorType } from '../services/httpErrors.js';
import { fetchProducts } from '../services/productsService.js';
import { getProductsPageContent } from '../services/strapiService.js';

function getProductErrorCopy(error) {
  const copy = {
    [ApiErrorType.CLIENT]: 'The product request was not accepted. Please verify the endpoint configuration.',
    [ApiErrorType.SERVER]: 'Fake Store API is having trouble. Please try again in a few minutes.',
    [ApiErrorType.NETWORK]: 'The app cannot reach Fake Store API. Check your connection and retry.',
    [ApiErrorType.TIMEOUT]: 'The request timed out before Fake Store API responded.',
    [ApiErrorType.UNKNOWN]: 'The product response did not match the expected format.',
  };

  return copy[error?.type] ?? 'An unexpected product loading error occurred.';
}

export function ProductsPage() {
  const productsPage = useAsyncResource(getProductsPageContent, []);
  const products = useAsyncResource(fetchProducts, []);
  const content = productsPage.data;

  return (
    <section className="container page-spacing">
      <SectionHeader
        eyebrow={content?.eyebrow ?? 'Exercise 2'}
        title={content?.title ?? 'Products from Fake Store API'}
        description={
          content?.description ??
          'CMS content is loading while product titles are fetched through a resilient service layer.'
        }
      />

      {productsPage.status === 'error' ? (
        <StatusMessage
          tone="warning"
          title="CMS page copy is unavailable"
          message="The products list can still load with safe fallback copy."
        />
      ) : null}

      {products.status === 'loading' ? (
        <div className="product-list product-list--loading" aria-live="polite">
          <div className="skeleton skeleton--row" />
          <div className="skeleton skeleton--row" />
          <div className="skeleton skeleton--row" />
        </div>
      ) : null}

      {products.status === 'error' ? (
        <StatusMessage
          tone="danger"
          title="Products could not be loaded"
          message={`${getProductErrorCopy(products.error)} ${products.error.message}`}
        />
      ) : null}

      {products.status === 'success' && products.data.length === 0 ? (
        <StatusMessage
          title={content?.emptyStateTitle ?? 'No products available'}
          message={content?.emptyStateDescription ?? 'The external API returned an empty product list.'}
        />
      ) : null}

      {products.status === 'success' && products.data.length > 0 ? (
        <ProductTitleList products={products.data} />
      ) : null}
    </section>
  );
}
