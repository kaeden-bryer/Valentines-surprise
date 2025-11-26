import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../App.css';

interface Memory {
    key: number;
    title: string;
    description: string;
    date: string;
    image: string;
}

const DatabaseTest: React.FC = () => {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMemories();
    }, []);

    const fetchMemories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('memories')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;

            setMemories(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching memories:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="App">
                <div className="database-test">
                    <h1>Loading memories...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="App">
                <div className="database-test">
                    <h1>Error</h1>
                    <p style={{ color: 'red' }}>{error}</p>
                    <button onClick={fetchMemories}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <div className="database-test">
                <h1>All Memories ({memories.length})</h1>
                
                <div className="database-actions">
                    <Link to="/add-memory" className="add-memory-btn">
                        + Add New Memory
                    </Link>
                </div>

                {memories.length === 0 ? (
                    <p>No memories found in the database.</p>
                ) : (
                    <div className="memories-grid">
                        {memories.map((memory) => (
                            <div key={memory.key} className="memory-card">
                                <div className="memory-image">
                                    {memory.image ? (
                                        <img 
                                            src={memory.image} 
                                            alt={memory.title}
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                                            }}
                                        />
                                    ) : (
                                        <div className="no-image">No Image</div>
                                    )}
                                </div>
                                <div className="memory-content">
                                    <h2>{memory.title}</h2>
                                    <p className="memory-date">
                                        {new Date(memory.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="memory-description">{memory.description}</p>
                                    <div className="memory-actions">
                                        <Link to={`/add-memory?id=${memory.key}`} className="edit-btn">
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <button onClick={fetchMemories} style={{ marginTop: '20px' }}>
                    Refresh
                </button>
            </div>
        </div>
    );
};

export default DatabaseTest;