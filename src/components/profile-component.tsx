"use client"
import React, { useState, useEffect } from 'react';
import axiosInstance from './utils/axiosInstance';
import { useTranslation } from 'react-i18next';

interface User {
  id: number;
  email: string;
  username: string | null;
  phoneNumber: string | null;
  name: string | null;
  surname: string | null;
  age: number | null;
  smallDescription: string | null;
  tokenBalance: number | null;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const { t } = useTranslation();
    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500); // Change dots every 500ms
    
      return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axiosInstance.post('userId-by-token', { token });
            const id = response.data.id;
            const { data } = await axiosInstance.get<User>(`/users/${id}`);
            setUser(data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBuyTokens = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) throw new Error('No token found');
            const response = await axiosInstance.post('userId-by-token', { token });
            const id = response.data.id;

            const buyResponse = await axiosInstance.post('/payment/pay', { userId: id, amount: tokenAmount });
            const paymentUrl = buyResponse.data.paymentUrl;

            window.location.href = paymentUrl; // Перенаправление на Robokassa
        } catch (error) {
            console.error('Ошибка при покупке токенов:', error);
        }
    };    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axiosInstance.post('userId-by-token', { token });
            const id = response.data.id;
            await axiosInstance.put(`/users/${id}`, user);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user info:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div id="apartamentsList" className="mt-10 mx-auto">
               <div className="loader mx-auto mt-40"></div>
               <h1 className="text-[#F36202] text-center h-screen">{t('profile-component.1')}{dots}</h1>
            </div>
          );
    }
    if (isSaving) {
        <div id="apartamentsList" className="mt-10 mx-auto">
               <div className="loader mx-auto mt-40"></div>
               <h1 className="text-[#F36202] text-center h-screen">{t('profile-component.2')}{dots}</h1>
            </div>
    }
  return (

    <div className="container">
    <aside className="aside">
        <h2>{t('profile-component.3')}</h2>
        <a href="/profile">{t('profile-component.4')}</a>
    </aside>
    <main className="main">
        <div className="profile-card">
            <h2>{t('profile-component.4')}</h2>
            <div className="profile-picture">
                <img src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/PngItem_1468843.png" alt="Bordered avatar" />
            </div>
            {/* // тут инфа о токенах */}
            <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{t('profile-component.5')} {user?.tokenBalance}</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">{t('profile-component.6')}</label>
                    <div className="email-display">{user?.email}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">{t('profile-component.7')}</label>
                    <input 
                        type="text" 
                        id="surname" 
                        name="surname"
                        value={user?.surname || ''}
                        onChange={handleInputChange}
                        placeholder={t('profile-component.8')} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">{t('profile-component.9')}</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={user?.name || ''}
                        onChange={handleInputChange}
                        placeholder={t('profile-component.10')} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">{t('profile-component.11')}</label>
                    <input 
                        type="text" 
                        id="phoneNumber" 
                        name="phoneNumber"
                        value={user?.phoneNumber || ''}
                        onChange={handleInputChange}
                        placeholder="+77084652675" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="smallDescription">{t('profile-component.12')}</label>
                    <textarea 
                        id="smallDescription" 
                        name="smallDescription"
                        value={user?.smallDescription || ''}
                        onChange={handleInputChange}
                        placeholder={t('profile-component.13')}
                    ></textarea>
                </div>
                <div className="save-button">
                    <button type="submit">{t('profile-component.14')}</button>
                </div>
            </form>
            <div className="token-button" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowModal(true)} style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    backgroundColor: '#22c55e',
                    color: 'white',
                    border: '1px solid #22c55e',
                    borderRadius: '10px',
                    cursor: 'pointer'
                }}>
                    {t('profile-component.15')}
                </button>
            </div>
            {showModal && (
    <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
        <div style={{
            background: 'white', padding: '30px', borderRadius: '10px',
            maxWidth: '400px', width: '100%'
        }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
            {t('profile-component.16')}
            </h3>
            <input
                type="number"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(parseInt(e.target.value))}
                placeholder={t('profile-component.17')}
                min="1"
                style={{
                    width: '100%', padding: '10px', marginBottom: '20px',
                    fontSize: '14px', border: '1px solid #cbd5e0', borderRadius: '10px'
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={handleBuyTokens} style={{
                    padding: '10px 20px', fontSize: '14px', fontWeight: 600,
                    backgroundColor: '#FF7024', color: 'white', border: '1px solid #FF7024', borderRadius: '10px'
                }}>
                    {t('profile-component.18')}
                </button>
                <button onClick={() => setShowModal(false)} style={{
                    padding: '10px 20px', fontSize: '14px', fontWeight: 600,
                    backgroundColor: '#e5e7eb', color: '#1f2937', border: '1px solid #d1d5db', borderRadius: '10px'
                }}>
                    {t('profile-component.19')}
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    </main>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');

                body {

                    background-color: white;
                    color: #161931;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    padding: 20px;
                    margin: 0 auto;
                }
                .aside {
                    display: none;
                    flex-direction: column;
                    gap: 10px;
                    padding: 20px;
                    border-right: 1px solid #FFBB9A;
                }
                .aside h2 {
                    padding-left: 15px;
                    margin-bottom: 20px;
                    font-size: 24px;
                    font-weight: 600;
                }
                .aside a {
                    display: flex;
                    align-items: center;
                    padding: 10px 15px;
                    font-weight: 600;
                    text-decoration: none;
                    color: #626262;
                    border: 1px solid transparent;
                    border-radius: 9999px;
                }
                .aside a:hover {
                    color: #626262;
                    border: 1px solid #cbd5e0;
                }
                .main {
                    flex-grow: 1;
                    min-height: 100vh;
                    padding: 20px;
                }
                .profile-card {
                    padding: 20px;
                    margin: 20px 0;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .profile-card h2 {
                    padding-left: 15px;
                    font-size: 24px;
                    font-weight: 700;
                }
                .profile-picture {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-top: 20px;
                }
                .profile-picture img {
                    width: 100px;
                    height: 100px;
                    padding: 5px;
                    border-radius: 50%;
                    border: 2px solid #a0aec0;
                }
                .profile-buttons button {
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: 600;
                    border: 1px solid #cbd5e0;
                    border-radius: 10px;
                    background-color: #1a202c;
                    color: white;
                    cursor: pointer;
                }
                .profile-buttons button:hover {
                    background-color: #2d3748;
                }
                .profile-buttons button:nth-child(2) {
                    background-color: white;
                    color: #1a202c;
                }
                .profile-buttons button:nth-child(2):hover {
                    background-color: #edf2f7;
                }
                .form-group {
                    margin-top: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #626262;
                }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 10px;
                    font-size: 14px;
                    color: #1a202c;
                    border: 1px solid #cbd5e0;
                    border-radius: 10px;
                }
                .form-group textarea {
                    resize: vertical;
                    height: 100px;
                }
                .save-button {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20px;
                }
                .save-button button {
                    padding: 10px 20px;
                    font-size: 14px;
                    font-weight: 600;
                    background-color: #FF7024;
                    color: white;
                    border: 1px solid #FF7024;
                    border-radius: 10px;
                    cursor: pointer;
                }
                .save-button button:hover {
                    background-color: #CB5200;
                }
                .email-display {
                    padding: 10px;
                    font-size: 14px;
                    color: #1a202c;
                    background-color: #f7fafc;
                    border: 1px solid #cbd5e0;
                    border-radius: 10px;
                }

                @media (min-width: 768px) {
                    .container {
                        flex-direction: row;
                        padding: 30px;
                    }
                    .aside {
                        display: flex;
                        width: 25%;
                    }
                    .main {
                        width: 75%;
                        padding: 30px;
                    }
                }
            `}</style>
        </div>
  );
};

export default Profile;