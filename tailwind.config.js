module.exports = {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            'primary': '#e084b0',
            'secondary': '#F26522',
            'background': '#f9fafb',
            'orange-300': '#a54a78',
            'orange-400': '#EC9706',
            'pink': '#e084b0',
            'sky': '#13c9ca',
            'red-700':'#b91c1c',
            'red-500': '#ef4444',
            'gray-50': '#f9fafb',
            'gray-100': '#f3f4f6',
            'gray-200': '#e5e7eb',
            'gray-300': '#d1d5db',
            'gray-400': '#9ca3af',
            'gray-500': '#6b7280',
            'gray-600': '#4b5563',
            'gray-700': '#374151',
            'gray-900': '#212121',

            'green-200': '#A5D6A7',
            'green-300': '#81C784',
            'green-500': '#4CAF50',
            'green-800': '#2E7D32',
            'red-500': '#d32f2f',
            'blue-500': '#3b82f6',
            'white': '#FFFFFF',
            // 'black': '#000000',
            'black': '#790045',
            'button':'#2196f3'
        }
    },
    plugins: [],
}
