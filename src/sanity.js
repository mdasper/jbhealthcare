import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Connect to your Sanity project
export const client = createClient({
  projectId: 'qoi5yrg2', // Your specific project ID
  dataset: 'production',
  useCdn: false, // Set to false to see immediate updates
  apiVersion: '2023-01-01', // Use a UTC date string
});

// Helper function to get image URLs from Sanity
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
