<template>
  <div class="max-w-6xl mx-auto p-8 space-y-12">
    <div class="text-center">
      <h1 class="heading-3 text-neutral-900 mb-4">
        Skeleton Component Library
      </h1>
      <p class="body-3 text-neutral-600">
        Reusable skeleton components built with UnoCSS for loading states
      </p>
    </div>

    <!-- Basic Skeleton Component -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">Basic Skeleton Component</h2>
      <p class="body-4 text-neutral-600 mb-4">
        The base <code class="bg-neutral-100 px-2 py-1 rounded text-sm">Skeleton</code> component with various built-in variants.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h3 class="label-prominent-2">Text Variants</h3>
          <div class="space-y-3 p-4 border border-neutral-200 rounded-3">
            <Skeleton class="h-3" />
            <Skeleton variant="text" />
            <Skeleton variant="text" :lines="3" />
            <Skeleton variant="title" />
          </div>
          <pre class="bg-neutral-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;Skeleton variant="text" /&gt;
&lt;Skeleton variant="text" :lines="3" /&gt;
&lt;Skeleton variant="title" /&gt;</code></pre>
        </div>
        
        <div class="space-y-4">
          <h3 class="label-prominent-2">Shape Variants</h3>
          <div class="flex items-center space-x-4 p-4 border border-neutral-200 rounded-3">
            <Skeleton variant="avatar" rounded="full" />
            <Skeleton variant="avatar" width="60px" height="60px" rounded="lg" />
            <Skeleton variant="button" />
          </div>
          <pre class="bg-neutral-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;Skeleton variant="avatar" rounded="full" /&gt;
&lt;Skeleton variant="avatar" width="60px" height="60px" rounded="lg" /&gt;
&lt;Skeleton variant="button" /&gt;</code></pre>
        </div>
      </div>
    </section>

    <!-- Custom Sizes -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">Custom Dimensions</h2>
      <p class="body-4 text-neutral-600 mb-4">
        Override default sizes with custom width and height props.
      </p>
      
      <div class="space-y-4 p-4 border border-neutral-200 rounded-3">
        <Skeleton width="100%" height="60px" rounded="lg" />
        <Skeleton width="75%" height="40px" rounded="md" />
        <Skeleton width="50%" height="20px" rounded="sm" />
        <Skeleton width="25%" height="16px" rounded="sm" />
      </div>
      <pre class="bg-neutral-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;Skeleton width="100%" height="60px" rounded="lg" /&gt;
&lt;Skeleton width="75%" height="40px" rounded="md" /&gt;
&lt;Skeleton width="50%" height="20px" rounded="sm" /&gt;
&lt;Skeleton width="25%" height="16px" rounded="sm" /&gt;</code></pre>
    </section>

    <!-- Image Skeletons -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">Image Skeletons</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-2">
          <Skeleton variant="image" height="200px" />
          <p class="text-sm text-neutral-600">Default aspect ratio</p>
        </div>
        <div class="space-y-2">
          <Skeleton variant="image" height="150px" rounded="xl" />
          <p class="text-sm text-neutral-600">Custom height & rounded</p>
        </div>
        <div class="space-y-2">
          <Skeleton width="100%" height="120px" rounded="full" />
          <p class="text-sm text-neutral-600">Square with full rounded</p>
        </div>
      </div>
      <pre class="bg-neutral-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;Skeleton variant="image" height="200px" /&gt;
&lt;Skeleton variant="image" height="150px" rounded="xl" /&gt;
&lt;Skeleton width="100%" height="120px" rounded="full" /&gt;</code></pre>
    </section>

    <!-- Card Skeleton -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">Card Skeleton</h2>
      <p class="body-4 text-neutral-600 mb-4">
        Pre-built card skeleton with image, title, description, and footer.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard 
          image-height="150px" 
          :description-lines="3" 
          image-rounded="xl" 
        />
      </div>
      <pre class="bg-neutral-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;SkeletonCard /&gt;
&lt;SkeletonCard 
  image-height="150px" 
  :description-lines="3" 
  image-rounded="xl" 
/&gt;</code></pre>
    </section>

    <!-- List Skeleton -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">List Skeleton</h2>
      <p class="body-4 text-neutral-600 mb-4">
        List items with avatar, content, and optional metadata.
      </p>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h3 class="label-prominent-2">Basic List</h3>
          <SkeletonList :count="3" />
        </div>
        <div class="space-y-4">
          <h3 class="label-prominent-2">With Actions</h3>
          <SkeletonList :count="3" :show-action="true" :show-meta="false" />
        </div>
      </div>
      <pre class="bg-neutral-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;SkeletonList :count="3" /&gt;
&lt;SkeletonList :count="3" :show-action="true" :show-meta="false" /&gt;</code></pre>
    </section>

    <!-- Table Skeleton -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">Table Skeleton</h2>
      <p class="body-4 text-neutral-600 mb-4">
        Table structure with header and data rows.
      </p>
      
      <SkeletonTable :columns="5" :rows="4" />
      <pre class="bg-neutral-100 p-3 rounded text-sm overflow-x-auto"><code>&lt;SkeletonTable :columns="5" :rows="4" /&gt;</code></pre>
    </section>

    <!-- Complex Layout Example -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">Complex Layout</h2>
      <p class="body-4 text-neutral-600 mb-4">
        Combine multiple skeleton components to create complex layouts.
      </p>
      
      <div class="border border-neutral-200 rounded-4 p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <Skeleton variant="avatar" rounded="full" />
            <div class="space-y-2">
              <Skeleton width="120px" height="20px" rounded="sm" />
              <Skeleton width="80px" height="16px" rounded="sm" />
            </div>
          </div>
          <Skeleton variant="button" />
        </div>
        
        <!-- Content -->
        <div class="space-y-4">
          <Skeleton variant="title" />
          <Skeleton variant="text" :lines="3" />
          
          <!-- Image -->
          <Skeleton variant="image" height="200px" class="my-6" />
          
          <!-- Footer -->
          <div class="flex items-center justify-between pt-4">
            <div class="flex items-center space-x-6">
              <Skeleton width="60px" height="16px" rounded="sm" />
              <Skeleton width="80px" height="16px" rounded="sm" />
              <Skeleton width="70px" height="16px" rounded="sm" />
            </div>
            <Skeleton width="100px" height="32px" rounded="md" />
          </div>
        </div>
      </div>
    </section>

    <!-- Props Reference -->
    <section class="space-y-6">
      <h2 class="heading-5 text-neutral-900">Props Reference</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Skeleton Props -->
        <div class="space-y-4">
          <h3 class="label-prominent-2">Skeleton Component</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-neutral-200">
                  <th class="text-left p-2">Prop</th>
                  <th class="text-left p-2">Type</th>
                  <th class="text-left p-2">Default</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200">
                <tr>
                  <td class="p-2 font-mono text-xs">variant</td>
                  <td class="p-2 text-xs">string</td>
                  <td class="p-2 text-xs">'custom'</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono text-xs">width</td>
                  <td class="p-2 text-xs">string | number</td>
                  <td class="p-2 text-xs">-</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono text-xs">height</td>
                  <td class="p-2 text-xs">string | number</td>
                  <td class="p-2 text-xs">-</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono text-xs">rounded</td>
                  <td class="p-2 text-xs">string</td>
                  <td class="p-2 text-xs">'md'</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono text-xs">lines</td>
                  <td class="p-2 text-xs">number</td>
                  <td class="p-2 text-xs">1</td>
                </tr>
                <tr>
                  <td class="p-2 font-mono text-xs">class</td>
                  <td class="p-2 text-xs">string</td>
                  <td class="p-2 text-xs">''</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Variants -->
        <div class="space-y-4">
          <h3 class="label-prominent-2">Available Variants</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between p-2 bg-neutral-50 rounded">
              <code class="text-xs">text</code>
              <span class="text-xs text-neutral-600">Single line text</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-neutral-50 rounded">
              <code class="text-xs">title</code>
              <span class="text-xs text-neutral-600">Heading/title</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-neutral-50 rounded">
              <code class="text-xs">avatar</code>
              <span class="text-xs text-neutral-600">Profile picture</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-neutral-50 rounded">
              <code class="text-xs">button</code>
              <span class="text-xs text-neutral-600">Action button</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-neutral-50 rounded">
              <code class="text-xs">card</code>
              <span class="text-xs text-neutral-600">Card container</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-neutral-50 rounded">
              <code class="text-xs">image</code>
              <span class="text-xs text-neutral-600">Image/media</span>
            </div>
            <div class="flex items-center justify-between p-2 bg-neutral-50 rounded">
              <code class="text-xs">custom</code>
              <span class="text-xs text-neutral-600">Custom dimensions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// This component demonstrates all skeleton variants and use cases
</script>
