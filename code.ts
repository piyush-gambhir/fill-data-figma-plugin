figma.showUI(__html__, { width: 400, height: 700 });

interface VehicleEntry {
    vin: string;
    make: string;
    model: string;
    year: string;
    price: string;
    body_type: string;
    trim: string;
    engine: string;
    transmission: string;
    fuel_type: string;
    mileage: string;
    exterior_color: string;
    interior_color: string;
    drivetrain: string;
    features: string[];
}

const sampleData: VehicleEntry[] = [
    {
        vin: "1HGCM82633A123456",
        make: "Honda",
        model: "Accord",
        year: "2023",
        price: "$32,000",
        body_type: "Sedan",
        trim: "Sport",
        engine: "1.5L Turbo 4-Cylinder",
        transmission: "CVT",
        fuel_type: "Gasoline",
        mileage: "32 City / 38 Hwy",
        exterior_color: "Sonic Gray Pearl",
        interior_color: "Black Leather",
        drivetrain: "FWD",
        features: ["Apple CarPlay", "Android Auto", "Lane Departure Warning"],
    },
    {
        vin: "5TDZA23C13S012345",
        make: "Toyota",
        model: "Camry",
        year: "2023",
        price: "$30,000",
        body_type: "Sedan",
        trim: "XSE",
        engine: "2.5L 4-Cylinder",
        transmission: "8-Speed Automatic",
        fuel_type: "Gasoline",
        mileage: "28 City / 39 Hwy",
        exterior_color: "Wind Chill Pearl",
        interior_color: "Red Leather",
        drivetrain: "FWD",
        features: ["Panoramic Roof", "JBL Audio", "Wireless Charging"],
    },
    {
        vin: "1FTEW1E53JFB12345",
        make: "Ford",
        model: "F-150",
        year: "2023",
        price: "$45,000",
        body_type: "Truck",
        trim: "Lariat",
        engine: "3.5L EcoBoost V6",
        transmission: "10-Speed Automatic",
        fuel_type: "Gasoline",
        mileage: "20 City / 26 Hwy",
        exterior_color: "Rapid Red",
        interior_color: "Black/Brown Leather",
        drivetrain: "4WD",
        features: [
            "Pro Trailer Backup Assist",
            "360-Degree Camera",
            "Power Tailgate",
        ],
    },
];

let currentIndex = 0;

// Helper function to get system fonts
async function getSystemFonts(): Promise<FontName[]> {
    const systemFonts = [
        { family: "Inter", style: "Regular" },
        { family: "Roboto", style: "Regular" },
        { family: "Arial", style: "Regular" },
    ];
    return systemFonts;
}

// Helper function to get data for a specific index
function getVehicleData(index: number, field: string) {
    const entry = sampleData[index % sampleData.length];
    const dummy = {
        vin: entry.vin,
        year: entry.year,
        make: entry.make,
        model: entry.model,
        trim: entry.trim,
        price: entry.price,
        body_type: entry.body_type,
        engine: entry.engine,
        transmission: entry.transmission,
        fuel_type: entry.fuel_type,
        mileage: entry.mileage,
        exterior_color: entry.exterior_color,
        interior_color: entry.interior_color,
        drivetrain: entry.drivetrain,
        features: entry.features.join(", "),
        fullname: `${entry.year} ${entry.make} ${entry.model} ${entry.trim}`,
        full_specs: `${entry.year} ${entry.make} ${entry.model} ${entry.trim
            }\n${entry.engine} | ${entry.transmission} | ${entry.drivetrain}\n${entry.exterior_color
            } | ${entry.interior_color}\n${entry.features.join(", ")}`,
    };

    return {
        value: dummy[field as keyof typeof dummy],
        vehicleInfo: `${entry.year} ${entry.make} ${entry.model}`,
    };
}

// Helper function to update a single text node
async function updateTextNode(node: TextNode, value: string): Promise<boolean> {
    try {
        // Get the current font
        const currentFont = node.fontName as FontName;

        // Try to load the current font first
        try {
            await figma.loadFontAsync(currentFont);
        } catch (error) {
            // If current font fails, try system fonts
            const systemFonts = await getSystemFonts();
            let fontLoaded = false;

            for (const font of systemFonts) {
                try {
                    await figma.loadFontAsync(font);
                    node.fontName = font;
                    fontLoaded = true;
                    break;
                } catch (e) {
                    console.warn(`Failed to load font: ${font.family}`, e);
                    continue;
                }
            }

            if (!fontLoaded) {
                return false;
            }
        }

        // Store original text properties
        const originalSize = node.fontSize;
        const originalColor = node.fills;
        const originalAlign = node.textAlignHorizontal;
        const originalAutoResize = node.textAutoResize;

        // Update the text
        node.characters = value;

        // Restore original properties
        if (originalSize) node.fontSize = originalSize;
        if (originalColor) node.fills = originalColor;
        if (originalAlign) node.textAlignHorizontal = originalAlign;
        if (originalAutoResize) node.textAutoResize = originalAutoResize;

        return true;
    } catch (error) {
        console.error("Error updating text node:", error);
        return false;
    }
}

interface VehicleImage {
    url: string;
    category: string;
    processing: string;
    ratio: string;
    angle: string;
    vehicle: {
        make: string;
        model: string;
        year: string;
    };
}

// Updated sample images with reliable URLs
const sampleImages: VehicleImage[] = [
    // Honda Accord
    {
        url: "https://media.spyneai.com/unsafe/fit-in/828x0/filters:format(webp)/https://spyne-media.s3.amazonaws.com/2025-05-21/car_replace_bg_4c0ed53f-d0b6-485c-a3b0-9ef86615cf20.jpg",
        category: "exterior",
        processing: "processed",
        ratio: "16:9",
        angle: "front",
        vehicle: {
            make: "Honda",
            model: "Accord",
            year: "2023",
        },
    },
    {
        url: "https://media.spyneai.com/unsafe/fit-in/828x0/filters:format(webp)/https://spyne-media.s3.amazonaws.com/2025-05-21/car_replace_bg_4c0ed53f-d0b6-485c-a3b0-9ef86615cf20.jpg",
        category: "interior",
        processing: "processed",
        ratio: "4:3",
        angle: "front",
        vehicle: {
            make: "Honda",
            model: "Accord",
            year: "2023",
        },
    },
    // Toyota Camry
    {
        url: "https://media.spyneai.com/unsafe/fit-in/828x0/filters:format(webp)/https://spyne-media.s3.amazonaws.com/2025-05-21/car_replace_bg_4c0ed53f-d0b6-485c-a3b0-9ef86615cf20.jpg",
        category: "exterior",
        processing: "processed",
        ratio: "16:9",
        angle: "front",
        vehicle: {
            make: "Toyota",
            model: "Camry",
            year: "2023",
        },
    },
    {
        url: "https://media.spyneai.com/unsafe/fit-in/828x0/filters:format(webp)/https://spyne-media.s3.amazonaws.com/2025-05-21/car_replace_bg_4c0ed53f-d0b6-485c-a3b0-9ef86615cf20.jpg",
        category: "interior",
        processing: "processed",
        ratio: "4:3",
        angle: "front",
        vehicle: {
            make: "Toyota",
            model: "Camry",
            year: "2023",
        },
    },
    // Ford F-150
    {
        url: "https://media.spyneai.com/unsafe/fit-in/828x0/filters:format(webp)/https://spyne-media.s3.amazonaws.com/2025-05-21/car_replace_bg_4c0ed53f-d0b6-485c-a3b0-9ef86615cf20.jpg",
        category: "exterior",
        processing: "processed",
        ratio: "16:9",
        angle: "front",
        vehicle: {
            make: "Ford",
            model: "F-150",
            year: "2023",
        },
    },
    {
        url: "https://media.spyneai.com/unsafe/fit-in/828x0/filters:format(webp)/https://spyne-media.s3.amazonaws.com/2025-05-21/car_replace_bg_4c0ed53f-d0b6-485c-a3b0-9ef86615cf20.jpg",
        category: "interior",
        processing: "processed",
        ratio: "4:3",
        angle: "front",
        vehicle: {
            make: "Ford",
            model: "F-150",
            year: "2023",
        },
    },
];

// Function to find matching images
function findMatchingImages(settings: {
    category: string;
    processing: string;
    ratio: string;
    angle: string;
    vehicle?: {
        make: string;
        model: string;
        year: string;
    };
}): VehicleImage[] {
    try {
        // If no vehicle info provided, use the current vehicle
        if (!settings.vehicle) {
            settings.vehicle = {
                make: sampleData[currentIndex % sampleData.length].make,
                model: sampleData[currentIndex % sampleData.length].model,
                year: sampleData[currentIndex % sampleData.length].year
            };
        }

        // Log the search criteria
        console.log("Searching for images with settings:", settings);

        // Find all matching images
        const matches = sampleImages.filter((img) => {
            const categoryMatch = img.category === settings.category;
            const processingMatch = img.processing === settings.processing;
            const ratioMatch = img.ratio === settings.ratio;
            const angleMatch = img.angle === settings.angle;
            const vehicleMatch =
                settings.vehicle &&
                img.vehicle.make === settings.vehicle.make &&
                img.vehicle.model === settings.vehicle.model;

            return (
                categoryMatch &&
                processingMatch &&
                ratioMatch &&
                angleMatch &&
                vehicleMatch
            );
        });

        console.log(`Found ${matches.length} matching images`);

        // If no exact matches, fall back to any image with matching category
        if (matches.length === 0) {
            console.log("No exact matches, falling back to category matches");
            return sampleImages.filter(img => img.category === settings.category);
        }

        return matches;
    } catch (error) {
        console.error("Error in findMatchingImages:", error);
        return [];
    }
}

// Helper function to get error message
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}

// Updated createImageFrame function that uses async node methods
async function createImageFrame(
    node: FrameNode | RectangleNode,
    imageUrl: string,
    ratio: string
): Promise<boolean> {
    try {
        figma.notify("Starting image insertion...", { timeout: 2000 });
        console.log("Starting image insertion for URL:", imageUrl);

        // Convert rectangle to frame if needed
        let frameNode: FrameNode;
        if (node.type === "RECTANGLE") {
            const frame = figma.createFrame();
            frame.x = node.x;
            frame.y = node.y;
            frame.resize(node.width, node.height);
            if (node.parent) {
                node.parent.appendChild(frame);
            }
            node.remove();
            frameNode = frame;
        } else {
            frameNode = node as FrameNode;
        }

        // Store original dimensions
        const originalWidth = frameNode.width;
        const originalHeight = frameNode.height;

        // Calculate dimensions while preserving aspect ratio
        let targetWidth = originalWidth;
        let targetHeight = originalHeight;

        // Calculate the current aspect ratio
        const currentRatio = originalWidth / originalHeight;

        // Calculate the target aspect ratio
        const targetRatio =
            ratio === "16:9" ? 16 / 9 : ratio === "4:3" ? 4 / 3 : 1;

        // Adjust dimensions to match target ratio while trying to maintain original size
        if (currentRatio > targetRatio) {
            // Current frame is too wide
            targetWidth = targetHeight * targetRatio;
        } else {
            // Current frame is too tall
            targetHeight = targetWidth / targetRatio;
        }

        // Center the frame if dimensions changed
        frameNode.x += (originalWidth - targetWidth) / 2;
        frameNode.y += (originalHeight - targetHeight) / 2;

        // Resize frame to target dimensions
        frameNode.resize(targetWidth, targetHeight);

        // Set constraints to ensure image stays centered
        frameNode.constraints = {
            horizontal: "CENTER",
            vertical: "CENTER",
        };

        // Show loading state
        frameNode.fills = [
            {
                type: "SOLID",
                color: { r: 0.9, g: 0.9, b: 0.9 },
                opacity: 1,
            },
        ];

        // Add loading text
        const loadingText = figma.createText();
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        loadingText.characters = "Loading image...";
        loadingText.textAlignHorizontal = "CENTER";
        loadingText.textAlignVertical = "CENTER";
        loadingText.fontSize = 12;
        loadingText.fills = [
            { type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } },
        ];
        frameNode.appendChild(loadingText);
        loadingText.x = (targetWidth - loadingText.width) / 2;
        loadingText.y = (targetHeight - loadingText.height) / 2;

        // Save frame ID for later validation
        const frameId = frameNode.id;

        // Create a promise to handle the image loading
        return new Promise((resolve) => {
            let hasResolved = false;
            let timeoutId: number | null = null;

            // Message handler for image data
            const messageHandler = async (msg: any) => {
                try {
                    // Validate message
                    if (!msg || typeof msg.type !== 'string') {
                        console.warn('Received malformed or undefined pluginMessage:', msg);
                        return;
                    }

                    console.log(`Received message of type: ${msg.type}`);

                    if (msg.type === "IMAGE_DATA" && !hasResolved) {
                        if (timeoutId !== null) {
                            clearTimeout(timeoutId);
                            timeoutId = null;
                        }

                        // Check if our frame node still exists - USING ASYNC VERSION
                        try {
                            const frameNodeStillExists = await figma.getNodeByIdAsync(frameId) as FrameNode | null;
                            if (!frameNodeStillExists) {
                                console.error("Frame node no longer exists");
                                hasResolved = true;
                                resolve(false);
                                return;
                            }

                            // The node exists, now check for loading text nodes
                            try {
                                // Get all text nodes inside the frame
                                for (const child of frameNodeStillExists.children) {
                                    if (child.type === "TEXT" && child.characters === "Loading image...") {
                                        child.remove();
                                    }
                                }
                            } catch (e) {
                                console.warn("Couldn't remove loading text:", e);
                                // Non-critical error, continue
                            }

                            // Proceed with image data
                            if (!msg.data || !Array.isArray(msg.data) || msg.data.length === 0) {
                                throw new Error("No valid image data received");
                            }

                            // Convert array back to Uint8Array
                            const imageData = new Uint8Array(msg.data);
                            console.log(`Received image data of length: ${imageData.length}`);

                            try {
                                // Create and apply image
                                const image = await figma.createImage(imageData);

                                // Check if frame still exists before setting fills
                                const frameStillExists = await figma.getNodeByIdAsync(frameId) as FrameNode | null;
                                if (!frameStillExists) {
                                    console.error("Frame no longer exists when setting image");
                                    hasResolved = true;
                                    resolve(false);
                                    return;
                                }

                                frameStillExists.fills = [
                                    {
                                        type: "IMAGE",
                                        imageHash: image.hash,
                                        scaleMode: "FILL",
                                        scalingFactor: 1,
                                    },
                                ];

                                figma.notify("Image inserted successfully!", {
                                    timeout: 2000,
                                });

                                figma.ui.postMessage({ type: "IMAGE_INSERTED" });

                                hasResolved = true;
                                resolve(true);

                            } catch (imageError) {
                                console.error("Error creating image:", imageError);
                                const errorMsg = imageError instanceof Error ?
                                    imageError.message : String(imageError);

                                figma.notify(`Error creating image: ${errorMsg}`, { error: true });
                                figma.ui.postMessage({
                                    type: "IMAGE_ERROR",
                                    error: errorMsg,
                                });

                                // Check if frame still exists before creating placeholder
                                try {
                                    const frameStillExists = await figma.getNodeByIdAsync(frameId) as FrameNode | null;
                                    if (frameStillExists) {
                                        await createPlaceholder(
                                            frameStillExists,
                                            targetWidth,
                                            targetHeight,
                                            `Error: ${errorMsg}`
                                        );
                                    }
                                } catch (e) {
                                    console.error("Error creating placeholder:", e);
                                }

                                hasResolved = true;
                                resolve(false);
                            }
                        } catch (nodeError) {
                            console.error("Error accessing frame node:", nodeError);
                            hasResolved = true;
                            resolve(false);
                        }
                    }
                    else if (msg.type === "IMAGE_ERROR" && !hasResolved) {
                        if (timeoutId !== null) {
                            clearTimeout(timeoutId);
                            timeoutId = null;
                        }

                        // Check if our frame still exists
                        try {
                            const frameNodeStillExists = await figma.getNodeByIdAsync(frameId) as FrameNode | null;
                            if (frameNodeStillExists) {
                                // Remove loading text if it exists
                                for (const child of frameNodeStillExists.children) {
                                    if (child.type === "TEXT" && child.characters === "Loading image...") {
                                        child.remove();
                                    }
                                }

                                const errorMsg = msg.error
                                    ? String(msg.error)
                                    : "Unknown error occurred";

                                console.error("Failed to fetch image:", errorMsg);

                                figma.notify(`Failed to fetch image: ${errorMsg}`, {
                                    error: true,
                                });

                                await createPlaceholder(
                                    frameNodeStillExists,
                                    targetWidth,
                                    targetHeight,
                                    `Failed to fetch image: ${errorMsg}`
                                );
                            }
                        } catch (nodeError) {
                            console.error("Error accessing frame node:", nodeError);
                        }

                        hasResolved = true;
                        resolve(false);
                    }
                } catch (handlerError) {
                    console.error("Error in message handler:", handlerError);

                    // Only handle if we haven't resolved yet
                    if (!hasResolved) {
                        try {
                            // Check if our frame still exists
                            const frameNodeStillExists = await figma.getNodeByIdAsync(frameId) as FrameNode | null;
                            if (frameNodeStillExists) {
                                // Remove loading text if it exists
                                for (const child of frameNodeStillExists.children) {
                                    if (child.type === "TEXT" && child.characters === "Loading image...") {
                                        child.remove();
                                    }
                                }

                                const errorMsg = handlerError instanceof Error ?
                                    handlerError.message : String(handlerError);

                                figma.notify(`Error processing message: ${errorMsg}`, { error: true });

                                await createPlaceholder(
                                    frameNodeStillExists,
                                    targetWidth,
                                    targetHeight,
                                    `Error: ${errorMsg}`
                                );
                            }
                        } catch (nodeError) {
                            console.error("Error accessing frame node:", nodeError);
                        }

                        hasResolved = true;
                        resolve(false);
                    }
                }
            };

            // Add message listener
            figma.ui.on("message", messageHandler);

            // Request image data from UI
            figma.ui.postMessage({
                type: "FETCH_IMAGE",
                url: imageUrl,
            });

            // Set timeout
            timeoutId = setTimeout(async () => {
                if (!hasResolved) {
                    try {
                        // Check if our frame still exists
                        const frameNodeStillExists = await figma.getNodeByIdAsync(frameId) as FrameNode | null;
                        if (frameNodeStillExists) {
                            // Remove loading text if it exists
                            for (const child of frameNodeStillExists.children) {
                                if (child.type === "TEXT" && child.characters === "Loading image...") {
                                    child.remove();
                                }
                            }

                            const timeoutMsg = "Image loading timed out";
                            console.error(timeoutMsg);

                            figma.notify(timeoutMsg, { error: true });

                            figma.ui.postMessage({
                                type: "IMAGE_ERROR",
                                error: timeoutMsg,
                            });

                            await createPlaceholder(
                                frameNodeStillExists,
                                targetWidth,
                                targetHeight,
                                "Image loading timed out. Please try again."
                            );
                        }
                    } catch (nodeError) {
                        console.error("Error accessing frame node:", nodeError);
                    }

                    hasResolved = true;
                    resolve(false);
                }
                figma.ui.off("message", messageHandler);
            }, 60000); // 60 second timeout
        });
    } catch (error: unknown) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error("Error in createImageFrame:", errorMsg);
        figma.notify(`Error in createImageFrame: ${errorMsg}`, { error: true });
        figma.ui.postMessage({ type: "IMAGE_ERROR", error: errorMsg });
        return false;
    }
}

// Make createPlaceholder async as well
async function createPlaceholder(
    frameNode: FrameNode,
    width: number,
    height: number,
    errorMessage: string
) {
    try {
        // Add placeholder fill
        frameNode.fills = [
            {
                type: "SOLID",
                color: { r: 0.9, g: 0.9, b: 0.9 },
                opacity: 1,
            },
        ];

        // Add error message
        const text = figma.createText();
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        text.characters = errorMessage;
        text.textAlignHorizontal = "CENTER";
        text.textAlignVertical = "CENTER";
        text.fontSize = 12;
        text.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];

        // Center the text in the frame
        text.resize(width * 0.8, height * 0.8);
        frameNode.appendChild(text);
        text.x = (width - text.width) / 2;
        text.y = (height - text.height) / 2;
    } catch (error: unknown) {
        console.error(
            "Error creating placeholder:",
            error instanceof Error ? error.message : String(error)
        );
    }
}

figma.ui.onmessage = async (msg: any) => {
    if (msg.type === "INSERT_FIELD") {
        const { field } = msg.payload;
        const selectedNodes = figma.currentPage.selection;

        // Check for selection
        if (selectedNodes.length === 0) {
            figma.notify("Please select at least one text layer");
            return;
        }

        // Filter text nodes
        const textNodes = selectedNodes.filter((node) => node.type === "TEXT");
        if (textNodes.length === 0) {
            figma.notify("Please select at least one text layer");
            return;
        }

        try {
            // Track success and failures
            let successCount = 0;
            let failureCount = 0;
            const updatedVehicles = new Set<string>();

            // Update each text node with different vehicle data
            for (let i = 0; i < textNodes.length; i++) {
                const node = textNodes[i];
                const dataIndex = (currentIndex + i) % sampleData.length;
                const { value, vehicleInfo } = getVehicleData(dataIndex, field);

                const valueToInsert =
                    typeof value === "undefined" || value === null
                        ? "—"
                        : String(value);
                const success = await updateTextNode(node, valueToInsert);

                if (success) {
                    successCount++;
                    updatedVehicles.add(vehicleInfo);
                } else {
                    failureCount++;
                }
            }

            // Update the current index to the next unused vehicle
            currentIndex =
                (currentIndex + textNodes.length) % sampleData.length;

            // Create notification message
            let message = "";
            if (successCount > 0 && failureCount === 0) {
                const vehicleList = Array.from(updatedVehicles).join(", ");
                message = `Updated ${successCount} layer${successCount > 1 ? "s" : ""
                    } with data from: ${vehicleList}`;
            } else if (successCount > 0 && failureCount > 0) {
                message = `Updated ${successCount} layer${successCount > 1 ? "s" : ""
                    }, ${failureCount} failed`;
            } else {
                message = "Failed to update any layers";
            }

            // Show notification
            figma.notify(message);
        } catch (error: any) {
            console.error("Error updating text layers:", error);
            figma.notify(
                "Error updating text layers: " +
                (error.message || "Unknown error")
            );
        }
    } else if (msg.type === "INSERT_IMAGE") {
        const { category, processing, ratio, angle } = msg.payload;
        const selectedNodes = figma.currentPage.selection;

        // Check for selection
        if (selectedNodes.length === 0) {
            figma.notify("Please select at least one frame or rectangle");
            return;
        }

        // Filter frame and rectangle nodes
        const validNodes = selectedNodes.filter(
            (node) => node.type === "FRAME" || node.type === "RECTANGLE"
        );

        if (validNodes.length === 0) {
            figma.notify("Please select at least one frame or rectangle");
            return;
        }

        try {
            // Find matching images
            const matchingImages = findMatchingImages({
                category,
                processing,
                ratio,
                angle,
                vehicle: sampleData[currentIndex % sampleData.length],
            });

            if (matchingImages.length === 0) {
                figma.notify(
                    "No matching images found for the selected criteria"
                );
                return;
            }

            // Track success and failures
            let successCount = 0;
            let failureCount = 0;

            // Update each frame/rectangle with an image
            for (let i = 0; i < validNodes.length; i++) {
                const node = validNodes[i];
                const imageData = matchingImages[i % matchingImages.length];

                const success = await createImageFrame(
                    node,
                    imageData.url,
                    ratio
                );

                if (success) {
                    successCount++;
                } else {
                    failureCount++;
                }
            }

            // Create notification message
            let message = "";
            if (successCount > 0 && failureCount === 0) {
                message = `Updated ${successCount} frame${successCount > 1 ? "s" : ""
                    } with images`;
            } else if (successCount > 0 && failureCount > 0) {
                message = `Updated ${successCount} frame${successCount > 1 ? "s" : ""
                    }, ${failureCount} failed`;
            } else {
                message = "Failed to update any frames";
            }

            // Show notification
            figma.notify(message);
        } catch (error: any) {
            console.error("Error updating frames:", error);
            figma.notify(
                "Error updating frames: " + (error.message || "Unknown error")
            );
        }
    }
};