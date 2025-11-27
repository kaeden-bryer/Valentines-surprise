import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../App.css';

interface Divider {
    key: number;
    title: string;
    date: string;
}

const ManageDividers: React.FC = () => {
    const [dividers, setDividers] = useState<Divider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: '', date: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchDividers();
    }, []);

    const fetchDividers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('dividers')
                .select('*')
                .order('date', { ascending: true });

            if (error) throw error;
            setDividers(data || []);
        } catch (err) {
            console.error('Error fetching dividers:', err);
            setError(err instanceof Error ? err.message : 'Failed to load dividers');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.date) {
            setError('Title and date are required');
            return;
        }

        try {
            setSubmitting(true);
            setError(null);

            const { error: insertError } = await supabase
                .from('dividers')
                .insert([{ title: formData.title, date: formData.date }]);

            if (insertError) throw insertError;

            setFormData({ title: '', date: '' });
            fetchDividers();
        } catch (err) {
            console.error('Error adding divider:', err);
            setError(err instanceof Error ? err.message : 'Failed to add divider');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (key: number) => {
        if (!confirm('Are you sure you want to delete this divider?')) return;

        try {
            const { error: deleteError } = await supabase
                .from('dividers')
                .delete()
                .eq('key', key);

            if (deleteError) throw deleteError;
            fetchDividers();
        } catch (err) {
            console.error('Error deleting divider:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete divider');
        }
    };

    return (
        <div className="App">
            <div className="add-memory">
                <h1>Manage Timeline Dividers</h1>

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                <div className="memory-form">
                    <h2>Add New Divider</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title *</label>
                            <input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., 2024, Officially Dating"
                                disabled={submitting}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Date * (divider appears before this date)</label>
                            <input
                                type="date"
                                id="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                disabled={submitting}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" disabled={submitting} className="submit-btn">
                                {submitting ? 'Adding...' : 'Add Divider'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="dividers-list" style={{ marginTop: '40px' }}>
                    <h2>Existing Dividers</h2>
                    
                    {loading ? (
                        <p>Loading dividers...</p>
                    ) : dividers.length === 0 ? (
                        <p>No dividers yet. Add one above!</p>
                    ) : (
                        <div className="memories-grid">
                            {dividers.map((divider) => (
                                <div key={divider.key} className="divider-card">
                                    <h3>{divider.title}</h3>
                                    <p className="memory-date">
                                        {new Date(divider.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <button 
                                        onClick={() => handleDelete(divider.key)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-actions" style={{ marginTop: '30px' }}>
                    <Link to="/database-test" className="cancel-link">
                        Back to Memories
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ManageDividers;
