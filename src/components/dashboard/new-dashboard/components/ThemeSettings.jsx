// src/components/settings/ThemeSettings.jsx
import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { TooltipComponent } from '@syncfusion/ej2-react-popups'; // Keep for color name tooltips
// import { themeColors } from '../data/dummy.jsx'; // We will not use the predefined list for selection anymore
import { useStateContext } from '../contexts/ContextProvider.jsx';
import Switch from '../components/themeSettings/Switch.jsx'; // Your original UIVerse toggle component

const ThemeSettings = () => {
    const {
        setColor,       // For main theme color
        setMode,        // For Light/Dark mode
        currentMode,
        currentColor,   // Current main theme color
        sidebarColor,   // Current sidebar color
        setSidebarColor // For sidebar color
    } = useStateContext();

    // State to manage which color target is being edited
    const [colorTarget, setColorTarget] = useState('theme'); // 'theme' or 'sidebar'

    // State for the color input field (text input for HEX/RGB)
    const [customColorInput, setCustomColorInput] = useState(
        // Initialize based on the initial target and its current color
        currentColor // Default to theme color first or sidebarColor if target is sidebar initially
    );

    // State for the <input type="color"> picker.
    const [pickerColor, setPickerColor] = useState(
        currentColor // Default to theme color first
    );

    // Effect to update input field and picker when context color or target changes
    useEffect(() => {
        const targetIsTheme = colorTarget === 'theme';
        const activeColor = targetIsTheme ? currentColor : sidebarColor;
        setCustomColorInput(activeColor);
        setPickerColor(activeColor);
    }, [currentColor, sidebarColor, colorTarget]);


    // Handler for YOUR UIVerse Switch component
    // This assumes your Switch component's onChange provides an event where e.target.checked indicates "Dark Mode"
    const handleThemeModeToggle = (event) => {
        const newMode = event.target.checked ? 'Dark' : 'Light';
        // Your ContextProvider.setMode expects an event-like object with a 'value' property
        setMode({ target: { value: newMode } });
    };

    // Handler for the text input (HEX/RGB)
    const handleCustomColorInputChange = (event) => {
        const newColor = event.target.value;
        setCustomColorInput(newColor);
        // Attempt to update picker as well, if it's a valid color for the native picker (HEX)
        if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
            setPickerColor(newColor);
        }
    };

    // Handler for the native color picker input
    const handlePickerColorChange = (event) => {
        const newColor = event.target.value; // This will be a HEX string
        setPickerColor(newColor);
        setCustomColorInput(newColor); // Sync text input
        // Apply the color to the selected target immediately
        if (colorTarget === 'theme') {
            setColor(newColor);
        } else {
            setSidebarColor(newColor);
        }
    };

    // Handler to apply color from the text input
    const applyCustomColor = () => {
        // More robust validation for HEX (3, 6, 8 digits) and RGB/RGBA
        const hexRegex = /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
        const rgbRegex = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i;
        const rgbaRegex = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/i;

        if (hexRegex.test(customColorInput) || rgbRegex.test(customColorInput) || rgbaRegex.test(customColorInput)) {
            if (colorTarget === 'theme') {
                setColor(customColorInput);
            } else {
                setSidebarColor(customColorInput);
            }
            // If the custom input was valid and applied, sync the picker too (if it was a HEX)
            if (hexRegex.test(customColorInput)) {
                setPickerColor(customColorInput);
            }
        } else {
            alert('Invalid color format. Please use HEX (e.g., #RRGGBB), RGB (e.g., rgb(r,g,b)), or RGBA.');
        }
    };

    // This function is from your original code, no longer needed if not using themeColors map for selection
    // const formatColorName = name =>
    //     name.replace('-theme', '').charAt(0).toUpperCase() +
    //     name.replace('-theme', '').slice(1);

    return (
        <div
            className="bg-white dark:bg-[#42464D] p-6 rounded-lg shadow-xl"
            style={{ width: '24rem', maxWidth: 'calc(100vw - 2rem)' }}
        >
            {/* THEME MODE SWITCHER (using your original UIVerse Switch component) */}
            <div className="border-b-1 border-gray-200 dark:border-gray-600 pb-4 mb-4 flex items-center justify-between">
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">Theme Mode</p>
                {/* Using your Switch component */}
                <Switch
                    // Assuming your Switch component takes 'checked' and 'onChange'
                    // and 'checked={true}' means Dark Mode for its internal animation
                    checked={currentMode === 'Dark'}
                    onChange={handleThemeModeToggle}
                    size="15px"
                    // If your Switch component used a 'size' prop like in my previous attempt:
                    // size="15px" // Keep if your Switch component expects this
                />
            </div>

            {/* COLOR TARGET SELECTOR */}
            <div className="border-b-1 border-gray-200 dark:border-gray-600 pb-4 mb-4">
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">Customize Color For</p>
                <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="colorTarget"
                            value="theme"
                            className="form-radio cursor-pointer text-blue-600 focus:ring-blue-500" // Added some Tailwind form styling
                            checked={colorTarget === 'theme'}
                            onChange={(e) => setColorTarget(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">Main Theme</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="colorTarget"
                            value="sidebar"
                            className="form-radio cursor-pointer text-blue-600 focus:ring-blue-500" // Added some Tailwind form styling
                            checked={colorTarget === 'sidebar'}
                            onChange={(e) => setColorTarget(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">Sidebar</span>
                    </label>
                </div>
            </div>

            {/* UNIFIED CUSTOM COLOR PICKER SECTION */}
            <div>
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">
                    Set {colorTarget === 'theme' ? 'Theme' : 'Sidebar'} Color
                </p>
                <div className="flex items-center space-x-3 mb-3">
                    <input
                        type="color"
                        value={pickerColor}
                        onChange={handlePickerColorChange}
                        className="w-10 h-10 p-0 border-none rounded-md cursor-pointer shadow" // Added shadow
                        title="Select color with picker"
                    />
                    <input
                        type="text"
                        value={customColorInput}
                        onChange={handleCustomColorInputChange}
                        placeholder="#RRGGBB, rgb(...), rgba(...)"
                        className="flex-grow p-2 border border-gray-300 dark:border-gray-500 rounded-md dark:bg-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <button
                    onClick={applyCustomColor}
                    // Use the current THEME color for the apply button for consistency
                    style={{ backgroundColor: currentColor, color: 'white' }}
                    className="w-full px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
                >
                    Apply Custom Color
                </button>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Current {colorTarget === 'theme' ? 'Theme' : 'Sidebar'} Color:
                    <span style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        backgroundColor: colorTarget === 'theme' ? currentColor : sidebarColor,
                        borderRadius: '50%',
                        marginLeft: '8px',
                        marginRight: '4px',
                        border: '1px solid #ccc',
                        verticalAlign: 'middle'
                    }} />
                    {colorTarget === 'theme' ? currentColor : sidebarColor}
                </div>
            </div>

            {/* Removed the old themeColors and sidebarColors sections that mapped buttons */}
        </div>
    );
};

export default ThemeSettings;