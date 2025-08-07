// Tailwind 配置文件

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 主题颜色变量
        'theme': {
          1: 'var(--c-theme-1)',
          2: 'var(--c-theme-2)',
          DEFAULT: 'var(--c-theme)',
        },
        // 灰度颜色变量
        'c': {
          0: 'var(--c-0)',
          10: 'var(--c-10)',
          20: 'var(--c-20)',
          25: 'var(--c-25)',
          30: 'var(--c-30)',
          40: 'var(--c-40)',
          50: 'var(--c-50)',
          60: 'var(--c-60)',
          70: 'var(--c-70)',
          80: 'var(--c-80)',
          90: 'var(--c-90)',
          100: 'var(--c-100)',
        },
        // 功能颜色
        'text': 'var(--c-text)',
        'bg-code': 'var(--c-bg-code)',
        'code-line-number': 'var(--c-code-line-number)',
        'scrollbar': 'var(--c-scrollbar)',
        'scrollbar-hover': 'var(--c-scrollbar-hover)',
        'border': 'var(--c-border)',
        'sep': 'var(--c-sep)',
        'sep-2': 'var(--c-sep-2)',
        'code-language': 'var(--c-code-language)',
      },
      typography: {
        DEFAULT: {
          css: {
            // 基础文本样式
            color: 'var(--c-text)',
            lineHeight: '1.5',

            // 标题样式
            h1: {
              color: 'var(--c-100)',
              fontWeight: '700',
              marginTop: '1.5em',
              marginBottom: '0.8em',
            },
            h2: {
              color: 'var(--c-100)',
              fontWeight: '600',
              marginTop: '1.0em',
              marginBottom: '0.6em',
            },
            h3: {
              color: 'var(--c-90)',
              fontWeight: '600',
              marginTop: '1.0em',
              marginBottom: '0.5em',
            },
            h4: {
              color: 'var(--c-80)',
              fontWeight: '600',
              marginTop: '0.8em',
              marginBottom: '0.4em',
            },

            // 段落样式
            p: {
              margin: '0.8rem 0px',
              lineHeight: '1.5',
            },

            // 链接样式
            a: {
              color: 'var(--c-theme)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },

            // 单行代码样式
            code: {
              backgroundColor: 'var(--c-bg-code)',
              borderRadius: '4px',
              padding: '0.2em 0.3em',
              fontSize: '0.9em',
              fontWeight: '400',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },

            // 代码块样式
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            },

            // 列表样式
            ul: {
              margin: '0px',
            },
            ol: {
              margin: '0px',
              '& p': {
                margin: '0px',
              },
            },
            li: {
              margin: '0px',
            },

            // 引用样式
            blockquote: {
              borderLeftColor: 'var(--c-theme)',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'normal',
              color: 'var(--c-50)',
              '& p': {
                margin: '0px 4px',
                fontStyle: 'normal',
                color: 'var(--c-50)',
              },
            },

            // 分割线样式
            hr: {
              borderColor: 'var(--c-sep)',
              borderWidth: '1px',
              margin: '1.5rem 0',
            },

            // 表格样式
            table: {
              borderCollapse: 'collapse',
              width: '100%',
            },
            th: {
              borderColor: 'var(--c-border)',
              backgroundColor: 'var(--c-10)',
            },
            td: {
              borderColor: 'var(--c-border)',
            },

            // 脚注样式
            '.footnotes': {
              fontSize: '0.8rem',
            },
            '.footnote-backref': {
              textDecoration: 'none',
              borderRadius: '4px',
              padding: '1px',
              '&:hover': {
                textDecoration: 'underline',
                backgroundColor: 'var(--c-theme)',
                color: 'var(--c-0)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
