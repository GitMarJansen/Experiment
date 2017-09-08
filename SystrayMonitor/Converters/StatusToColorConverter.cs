using System;
using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;

namespace SystrayMonitor.Converters
{
    internal class StatusToColorConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return new SolidColorBrush((bool)value ? Colors.Black : Colors.Red);
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return Binding.DoNothing;
        }
    }
}