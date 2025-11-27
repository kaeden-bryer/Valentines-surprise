import React, { useEffect, useState } from 'react';
import CollagePicture from './CollagePicture';
import Milestone from './Milestone';
import BackgroundMusic from './BackgroundMusic';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface Memory {
    key: number;
    title: string;
    description: string;
    date: string;
    image: string;
}

interface Divider {
    key: number;
    title: string;
    date: string;
}

type TimelineItem = 
    | { type: 'memory'; data: Memory }
    | { type: 'divider'; data: Divider };

const CollagePage: React.FC = () => {
    const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTimelineData();
    }, []);

    const fetchTimelineData = async () => {
        try {
            setLoading(true);

            // Fetch memories and dividers in parallel
            const [memoriesResult, dividersResult] = await Promise.all([
                supabase.from('memories').select('*').order('date', { ascending: true }),
                supabase.from('dividers').select('*').order('date', { ascending: true })
            ]);

            if (memoriesResult.error) throw memoriesResult.error;
            if (dividersResult.error) throw dividersResult.error;

            const memories = memoriesResult.data || [];
            const dividers = dividersResult.data || [];

            // Combine and sort by date
            const combined: TimelineItem[] = [
                ...memories.map(m => ({ type: 'memory' as const, data: m })),
                ...dividers.map(d => ({ type: 'divider' as const, data: d }))
            ];

            combined.sort((a, b) => {
                const dateA = new Date(a.data.date).getTime();
                const dateB = new Date(b.data.date).getTime();
                return dateA - dateB;
            });

            setTimelineItems(combined);
        } catch (err) {
            console.error('Error fetching timeline data:', err);
            setError(err instanceof Error ? err.message : 'Failed to load timeline');
        } finally {
            setLoading(false);
        }
    };

    const getGradientColor = (colorIndex: number): React.CSSProperties => {
        switch (colorIndex % 7) {
            case 0:
                return { background: "linear-gradient(to bottom, red, orange)" };
            case 1:
                return { background: "linear-gradient(to bottom, orange, yellow)" };
            case 2:
                return { background: "linear-gradient(to bottom, yellow, lightgreen)" };
            case 3:
                return { background: "linear-gradient(to bottom, lightgreen, lightblue)" };
            case 4:
                return { background: "linear-gradient(to bottom, lightblue, blue)" };
            case 5:
                return { background: "linear-gradient(to bottom, blue, purple)" };
            case 6:
                return { background: "linear-gradient(to bottom, purple, red)" };
            default:
                return { background: "linear-gradient(to bottom, black, white)" }; // shouldn't happen, this should raise an error
        }
    };

    if (loading) {
        return (
            <div className="collage-page">
                <h1>💖Our Memories✨</h1>
                <p style={{ textAlign: 'center', color: 'white' }}>Loading memories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="collage-page">
                <h1>💖Our Memories✨</h1>
                <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
            </div>
        );
    }

    let pictureNum = 0;
    let colorIndex = 0;

    return (
        <>
            <div className="collage-page">
                <h1>💖Our Memories✨</h1>

                <div className="database-actions">
                    <Link to="/add-memory" className="add-memory-btn">
                        + Add New Memory
                    </Link>
                </div>

                {timelineItems.map((item) => {
                    if (item.type === 'divider') {
                        return <Milestone key={`divider-${item.data.key}`} text={item.data.title} />;
                    } else {
                        const memory = item.data;

                        // Format date to "Month YY'" format
                        const formatDate = (dateStr: string): string => {
                            const date = new Date(dateStr);
                            const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 
                                              'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                            const month = monthNames[date.getMonth()];
                            const year = date.getFullYear().toString().slice(-2);
                            return `${month} ${year}'`;
                        };
                        
                        const formattedDate = formatDate(memory.date);
                        
                        // Determine text and image order (alternating)
                        const textOrder = pictureNum % 2 === 0 ? { order: 3 } : { order: 4 };
                        const imageOrder = pictureNum % 2 === 0 ? { order: 4 } : { order: 3 };
                        
                        // Get background color
                        const background = getGradientColor(colorIndex);
                        colorIndex = (colorIndex + 1) % 7;
                        
                        pictureNum++;

                        return (
                            <CollagePicture
                                key={`memory-${memory.key}`}
                                image={memory.image}
                                title={memory.title}
                                textOrder={textOrder}
                                imageOrder={imageOrder}
                                date={formattedDate}
                                text={memory.description}
                                background={background}
                                memoryKey={memory.key}
                            />
                        );
                    }
                })}

                <Milestone text="Present Date" />

                <div className="link-container">
                    <a href="/lyrics" className="back-link">Take me to the Lyrics</a>
                </div>

                <BackgroundMusic />
            </div>
        </>
    );
};

export default CollagePage;
