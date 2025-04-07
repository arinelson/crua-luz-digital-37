
import { useState, useEffect } from 'react';
import { Language } from '@/contexts/LanguageContext';

interface GeoLocationResult {
  countryCode: string | null;
  countryName: string | null;
  detectedLanguage: Language | null;
  loading: boolean;
  error: string | null;
}

const countryToLanguageMap: Record<string, Language> = {
  'BR': 'pt',
  'PT': 'pt',
  'US': 'en',
  'GB': 'en',
  'CA': 'en',
  'AU': 'en',
  'DE': 'de',
  'AT': 'de',
  'CH': 'de',
  'ES': 'es',
  'MX': 'es',
  'AR': 'es',
  'CO': 'es',
  'IT': 'it',
  'FR': 'fr',
  'BE': 'fr',
  // Adicione mais mapeamentos de países conforme necessário
};

export const useGeoLocation = (): GeoLocationResult => {
  const [geoData, setGeoData] = useState<GeoLocationResult>({
    countryCode: null,
    countryName: null,
    detectedLanguage: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGeoLocation = async () => {
      try {
        // Usamos o serviço ipapi.co para obter informações geográficas
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.reason || 'Failed to detect location');
        }
        
        // Determinar idioma com base no país
        const countryCode = data.country_code;
        const detectedLanguage = countryToLanguageMap[countryCode] || 'en';
        
        setGeoData({
          countryCode: data.country_code,
          countryName: data.country_name,
          detectedLanguage: detectedLanguage as Language,
          loading: false,
          error: null
        });
        
        // Salvar no localStorage para referência futura
        localStorage.setItem('detected_country', countryCode);
        localStorage.setItem('detected_language', detectedLanguage);
        
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setGeoData({
          countryCode: null,
          countryName: null,
          detectedLanguage: null,
          loading: false,
          error: 'Failed to detect location'
        });
      }
    };

    // Verificar se já temos as informações no localStorage
    const cachedCountry = localStorage.getItem('detected_country');
    const cachedLanguage = localStorage.getItem('detected_language') as Language | null;
    
    if (cachedCountry && cachedLanguage) {
      setGeoData({
        countryCode: cachedCountry,
        countryName: null, // Não salvamos o nome do país no cache
        detectedLanguage: cachedLanguage,
        loading: false,
        error: null
      });
    } else {
      fetchGeoLocation();
    }
  }, []);

  return geoData;
};
