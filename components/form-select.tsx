import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

export interface IPlaceHolderProps<T extends { id: number; name: string }> {
  formControl: Control;
  name: string;
  label: string;
  placeHolder: string;
  showLabel?: boolean;
  itemsList: Array<T>;
  children?: React.JSX.Element;
}

export default function FormSelect<T extends { id: number; name: string }>({
  formControl,
  name,
  showLabel = true,
  placeHolder,
  label,
  itemsList,
  children = undefined,
}: IPlaceHolderProps<T>) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {showLabel && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            value={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeHolder} />
              </SelectTrigger>
            </FormControl>
            {children ? (
              children
            ) : (
              <SelectContent>
                {itemsList &&
                  itemsList.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name} (#{item.id})
                    </SelectItem>
                  ))}
              </SelectContent>
            )}
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
