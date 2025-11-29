import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'K-Life Tools';
export const size = {
    width: 192,
    height: 192,
};
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 120,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                }}
            >
                K
            </div>
        ),
        {
            ...size,
        }
    );
}
