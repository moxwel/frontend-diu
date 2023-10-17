import React from 'react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';

export function Compartir({ url }) {
    return (
      <div className="CompartirEvento">
        <a href={`https://www.instagram.com/share?url=${url}`} target="_blank" rel="noreferrer">
          <FaInstagram size={32} color="#E1306C" />
        </a>
        <a href={`https://api.whatsapp.com/send?text=${url}`} target="_blank" rel="noreferrer">
          <FaWhatsapp size={32} color="#25D366" />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer">
          <FaFacebook size={32} color="#1877F2" />
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank" rel="noreferrer">
          <FaTwitter size={32} color="#1DA1F2" />
        </a>
      </div>
    );
  }
  