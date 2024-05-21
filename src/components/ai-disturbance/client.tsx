"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Skeleton } from "../ui/skeleton";
import { Slider } from "~/components/ui/slider";

export function AIDisturbanceClient() {
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [disturbanceLevel, setDisturbanceLevel] = useState<number>(5);
    const [originalImage, setOriginalImage] = useState<string | null>(null);

    const applyDisturbanceFilter = useCallback(() => {
        if (originalImage) {
            const img = new Image();
            img.src = originalImage;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const disturbanceImage = new Image();
                    disturbanceImage.src = "/filter/disturbance.jpg";
                    disturbanceImage.onload = () => {
                        ctx.globalAlpha = disturbanceLevel / 100;
                        ctx.drawImage(
                            disturbanceImage,
                            0,
                            0,
                            img.width,
                            img.height,
                        );
                        fetch(canvas.toDataURL("image/png"))
                            .then((res) => res.blob())
                            .then((blob) => {
                                setImage(new File([blob], imageName));
                                setIsProcessing(false);
                            });
                    };
                }
            };
        }
    }, [originalImage, disturbanceLevel, imageName]);

    useEffect(() => {
        applyDisturbanceFilter();
    }, [applyDisturbanceFilter]);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length == 1) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setOriginalImage(e.target?.result as string);
                setImageName(event.target.files![0].name);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <div>
            <div className="flex gap-2 flex-row items-center">
                <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <Button
                    disabled={!image}
                    onClick={() => {
                        if (!image) {
                            return;
                        }
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(image);
                        a.download = `${image.name.split(".")[0]}-disturbed-${disturbanceLevel}.png`;
                        a.click();
                    }}
                >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download
                </Button>
            </div>
            {isProcessing && !image ? (
                <Skeleton className="w-full h-64 mt-4" />
            ) : (
                image && (
                    <>
                        <Slider
                            defaultValue={[5]}
                            max={25}
                            min={0}
                            step={1}
                            onValueChange={(value) => {
                                setDisturbanceLevel(value[0]);
                            }}
                            className="mt-4"
                        />
                        <div className="text-sm flex justify-between text-muted-foreground">
                            <p>0</p>
                            <p>25</p>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={URL.createObjectURL(image)}
                            className="w-full mt-4"
                            alt="image"
                        />
                    </>
                )
            )}
        </div>
    );
}
