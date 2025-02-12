'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type ChangelogEntry = {
  date: string;
  title: string;
  description: string;
};

const ChangelogEntryItem = ({ date, title, description }: ChangelogEntry) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <div className="text-sm text-muted-foreground">{date}</div>
      </div>
      <div className="ml-6">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

type ChangelogProps = {
  entries?: ChangelogEntry[];
};

export const Changelog = ({ entries }: ChangelogProps) => {
  const [open, setOpen] = useState(true);
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Collapsible onOpenChange={setOpen} open={open} className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Recent Changes
            </h2>
            <CollapsibleTrigger className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              {open ? 'Hide changes' : 'Show changes'}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 group-hover:text-accent-foreground ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="mt-6">
            <div className="space-y-6">
              {entries?.map((entry, index) => (
                <ChangelogEntryItem
                  key={index}
                  date={entry.date}
                  title={entry.title}
                  description={entry.description}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
