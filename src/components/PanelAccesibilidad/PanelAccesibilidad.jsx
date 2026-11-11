import React, { useState, useEffect } from 'react';
import './PanelAccesibilidad.css';
import Icono from "../Icono";


export const PanelAccesibilidad = ({textos, onClose }) => {

    const acces = textos?.accesibilidad
    // Cargar estado inicial desde localStorage si existe
    const [fontSize, setFontSize] = useState(() => {
        const guardado = localStorage.getItem('accesibilidad-font-size');
        return guardado ? Number(guardado) : 100;
    });

    const [toggles, setToggles] = useState(() => {
        const guardado = localStorage.getItem('accesibilidad-toggles');
        return guardado ? JSON.parse(guardado) : {
            altoContraste: false,
            reducirMovimiento: false,
            subrayarEnlaces: false,
            espaciadoLectura: false,
        };
    });

    // APLICAR CAMBIOS EN TODA LA PÁGINA
    useEffect(() => {
        const root = document.documentElement;

        // 1. Tamaño del texto global
        root.style.fontSize = `${fontSize}%`;

        // 2. Alternar clases CSS globales según los interruptores
        root.classList.toggle('high-contrast', toggles.altoContraste);
        root.classList.toggle('reduce-motion', toggles.reducirMovimiento);
        root.classList.toggle('underline-links', toggles.subrayarEnlaces);
        root.classList.toggle('reading-spacing', toggles.espaciadoLectura);

        // 3. Persistir opciones en el navegador
        localStorage.setItem('accesibilidad-font-size', fontSize);
        localStorage.setItem('accesibilidad-toggles', JSON.stringify(toggles));
    }, [fontSize, toggles]);

    const handleToggle = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleReset = () => {
        setFontSize(100);
        setToggles({
            altoContraste: false,
            reducirMovimiento: false,
            subrayarEnlaces: false,
            espaciadoLectura: false,
        });
    };

    return (
        <div
            id="panel-accesibilidad"
            className="accessibility-panel"
            role="dialog"
            aria-labelledby="titulo-panel-accesibilidad"
        >
            {/* Encabezado */}
            <div className="ap-header">
                <h2 id="titulo-panel-accesibilidad" className="ap-title titular-h3">{acces?.titulo}</h2>
                <button className="ap-close-btn" onClick={onClose} aria-label="Cerrar panel">
                    <Icono nombre="cerrar"/>
                </button>
            </div>

            {/* Control de tamaño de texto */}
            <div className="ap-section">
                <h3 className="ap-section-title cuerpo-p-fuerte">{acces?.tamanoTexto?.etiqueta}</h3>
                <div className="ap-text-control">
                    <button
                        className="ap-text-btn cuerpo-m-fuerte"
                        onClick={() => setFontSize(prev => Math.max(prev - 5, 85))}
                        aria-label="Disminuir tamaño de texto"
                    >
                        -
                    </button>
                    <span className="ap-text-indicator cuerpo-m-fuerte">
                        {acces?.tamanoTexto?.valor?.replace(
                            "{valor}",
                            String(fontSize),
                        )}
                    </span>
                    <button
                        className="ap-text-btn cuerpo-m-fuerte"
                        onClick={() => setFontSize(prev => Math.min(prev + 5, 125))}
                        aria-label="Aumentar tamaño de texto"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Opciones de interruptores */}
            <div className="ap-toggles-list">
                <ToggleOption
                    title={acces?.altoContraste?.etiqueta}
                    description={acces?.altoContraste?.ayuda}
                    isActive={toggles.altoContraste}
                    onToggle={() => handleToggle('altoContraste')}
                />
                <ToggleOption
                    title={acces?.reducirMovimiento?.etiqueta}
                    description={acces?.reducirMovimiento?.ayuda}
                    isActive={toggles.reducirMovimiento}
                    onToggle={() => handleToggle('reducirMovimiento')}
                />
                <ToggleOption
                    title={acces?.subrayarEnlaces?.etiqueta}
                    description={acces?.subrayarEnlaces?.ayuda}
                    isActive={toggles.subrayarEnlaces}
                    onToggle={() => handleToggle('subrayarEnlaces')}
                />
                <ToggleOption
                    title={acces?.espaciado?.etiqueta}
                    description={acces?.espaciado?.ayuda}
                    isActive={toggles.espaciadoLectura}
                    onToggle={() => handleToggle('espaciadoLectura')}
                />
            </div>

            {/* Nota informativa */}
            <p className="ap-footer-note detalle-nota">
                {acces?.mensajes?.nota}
            </p>

            {/* Pie del panel */}
            <div className="ap-footer-actions">
                <a href="#declaracion-accesibilidad" className="ap-link detalle-nota-fuerte">
                    {acces?.enlaces?.declaracion}
                </a>
                <button className="ap-reset-btn detalle-nota-fuerte" onClick={handleReset}>
                    {acces?.botones?.restablecer}
                </button>
            </div>
        </div>
    );
};

const ToggleOption = ({ title, description, isActive, onToggle }) => (
    <div className="ap-toggle-item">
        <div className="ap-toggle-text">
            <h4 className="ap-toggle-title cuerpo-p-fuerte">{title}</h4>
            <p className="ap-toggle-desc detalle-nota">{description}</p>
        </div>
        <button
            className={`ap-toggle-switch ${isActive ? 'active' : ''}`}
            onClick={onToggle}
            aria-pressed={isActive}
        >
            <span className="ap-toggle-thumb"></span>
        </button>
    </div>
);