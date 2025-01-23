import { useState } from "react"
import { Card } from "@nextui-org/card"
import Image from "next/image"

// interface TemplateCardProps {
//     template: Template
//     isSelected: boolean
//     onSelect: (template: Template) => void
// }

export function TemplateCard({ template, isSelected, onSelect }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            isPressable
            isHoverable
            className={`w-[15rem] h-[25rem] relative aspect-[9/16] cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-purple-600' : ''
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPress={() => onSelect(template)}
        >
            <Image
                src={template.imageUrl || "/placeholder.svg"}
                alt={template.name}
                fill
                className="object-cover"
                priority
            />
            {(isHovered || isSelected) && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                        <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                        <p className="text-sm text-white/80">{template.description}</p>
                    </div>
                </div>
            )}
        </Card>
    )
}

