import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { uploadImage } from '../lib/storage';
import '../App.css';

const AddMemory: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const memoryId = searchParams.get('id');
    const isEditMode = !!memoryId;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Fetch existing memory data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            fetchMemory();
        }
    }, [memoryId]);

    const fetchMemory = async () => {
        try {
            setFetchingData(true);
            const { data, error } = await supabase
                .from('memories')
                .select('*')
                .eq('key', memoryId)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title: data.title,
                    description: data.description,
                    date: data.date
                });
                setExistingImageUrl(data.image);
                setImagePreview(data.image);
            }
        } catch (err) {
            console.error('Error fetching memory:', err);
            setError('Failed to load memory data');
        } finally {
            setFetchingData(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            setImageFile(file);
            setError(null);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validation
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        if (!formData.description.trim()) {
            setError('Description is required');
            return;
        }

        if (!formData.date) {
            setError('Date is required');
            return;
        }

        // Image is required only for new memories
        if (!isEditMode && !imageFile) {
            setError('Please select an image');
            return;
        }

        try {
            setLoading(true);

            // Upload new image if one was selected
            let imageUrl = existingImageUrl;
            if (imageFile) {
                console.log('Uploading image to Vercel Blob...');
                imageUrl = await uploadImage(imageFile);
                console.log('Image uploaded:', imageUrl);
            }

            if (isEditMode) {
                // Update existing memory
                console.log('Updating memory in database...');
                const { data, error: updateError } = await supabase
                    .from('memories')
                    .update({
                        title: formData.title,
                        description: formData.description,
                        date: formData.date,
                        ...(imageUrl && { image: imageUrl })
                    })
                    .eq('key', memoryId)
                    .select();

                if (updateError) throw updateError;
                console.log('Memory updated successfully:', data);
                setSuccess(true);
            } else {
                // Insert new memory
                console.log('Inserting memory into database...');
                const { data, error: insertError } = await supabase
                    .from('memories')
                    .insert([
                        {
                            title: formData.title,
                            description: formData.description,
                            date: formData.date,
                            image: imageUrl
                        }
                    ])
                    .select();

                if (insertError) throw insertError;
                console.log('Memory added successfully:', data);
                setSuccess(true);
            }

            // Redirect to database test page after 1.5 seconds
            setTimeout(() => {
                navigate('/database-test');
            }, 1500);

        } catch (err) {
            console.error(`Error ${isEditMode ? 'updating' : 'adding'} memory:`, err);
            setError(err instanceof Error ? err.message : `Failed to ${isEditMode ? 'update' : 'add'} memory`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <div className="add-memory">
                <h1>{isEditMode ? 'Edit Memory' : 'Add New Memory'}</h1>
                
                {fetchingData && (
                    <div className="loading-message">
                        <p>Loading memory data...</p>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        <p>✓ Memory {isEditMode ? 'updated' : 'added'} successfully! Redirecting...</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="memory-form">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter memory title"
                            disabled={loading || fetchingData}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            disabled={loading || fetchingData}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe this memory..."
                            rows={5}
                            disabled={loading || fetchingData}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">
                            Image {isEditMode ? '(optional - leave blank to keep current)' : '*'}
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={loading || fetchingData}
                            required={!isEditMode}
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                                {isEditMode && existingImageUrl && !imageFile && (
                                    <p className="preview-note">Current image</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={loading || fetchingData} className="submit-btn">
                            {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Memory' : 'Add Memory')}
                        </button>
                        <Link to="/database-test" className="cancel-link">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemory;
