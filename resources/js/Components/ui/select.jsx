"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
            )}
            {...props}
        >
            {children}
            {/* <SelectPrimitive.Icon asChild>
                <ChevronDown className="bg-gray-700 h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon> */}
        </SelectPrimitive.Trigger>
    )
);
SelectTrigger.displayName = "SelectTrigger";

const SelectScrollUpButton = React.forwardRef(
    ({ className, ...props }, ref) => (
        <SelectPrimitive.ScrollUpButton
            ref={ref}
            className={cn(
                "flex cursor-default items-center justify-center py-1",
                className
            )}
            {...props}
        >
            <ChevronUp className="h-4 w-4" />
        </SelectPrimitive.ScrollUpButton>
    )
);
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef(
    ({ className, ...props }, ref) => (
        <SelectPrimitive.ScrollDownButton
            ref={ref}
            className={cn(
                "flex cursor-default items-center justify-center py-1",
                className
            )}
            {...props}
        >
            <ChevronDown className="h-4 w-4" />
        </SelectPrimitive.ScrollDownButton>
    )
);
SelectScrollDownButton.displayName = "SelectScrollDownButton";

const SelectContent = React.forwardRef(
    ({ className, children, position = "popper", ...props }, ref) => (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                ref={ref}
                className={cn(
                    "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md",
                    position === "popper" && "data-[side=bottom]:translate-y-1",
                    className
                )}
                position={position}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                    className={cn(
                        "p-1",
                        position === "popper" &&
                            "w-full min-w-[var(--radix-select-trigger-width)]"
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
);
SelectContent.displayName = "SelectContent";

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
        {...props}
    />
));
SelectLabel.displayName = "SelectLabel";

const SelectItem = React.forwardRef(
    ({ className, children, ...props }, ref) => (
        <SelectPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm focus:bg-accent",
                className
            )}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    )
);
SelectItem.displayName = "SelectItem";

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
));
SelectSeparator.displayName = "SelectSeparator";

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
};
