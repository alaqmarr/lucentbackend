// components/app-footer.tsx
import { bFont } from '@/lib/utils';

export function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto py-6 border-t">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className={`${bFont.className} text-lg font-semibold uppercase`}>
                        {process.env.NEXT_PUBLIC_SHORT_NAME}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {process.env.NEXT_PUBLIC_TAGLINE}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} All rights reserved
                    </p>
                    <p
                        className='text-sm text-muted-foreground'
                    >
                        Designed, Developed and Powered by https://alaqmar.dev
                    </p>
                </div>
            </div>
        </footer>
    );
}