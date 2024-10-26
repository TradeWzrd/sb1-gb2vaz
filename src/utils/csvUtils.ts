import { Trade } from '../types/journal';

export const exportToCsv = (trades: Trade[], filename: string) => {
  const headers = [
    'Date',
    'Time',
    'Pair',
    'Type',
    'Entry Price',
    'Exit Price',
    'Stop Loss',
    'Take Profit',
    'Size',
    'PnL',
    'Status',
    'Strategy',
    'Market Type',
    'Exit Type',
    'Notes',
    'Tags'
  ];

  const rows = trades.map(trade => [
    trade.date,
    trade.time || '',
    trade.pair,
    trade.type,
    trade.entryPrice,
    trade.exitPrice || '',
    trade.stopLoss || '',
    trade.takeProfit || '',
    trade.size,
    trade.pnl,
    trade.status,
    trade.strategy,
    trade.marketType || '',
    trade.exitType || '',
    trade.notes || '',
    (trade.tags || []).join(';')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromCsv = (csvText: string): Trade[] => {
  try {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(header => 
      header.trim().replace(/^"(.*)"$/, '$1')
    );

    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(value => 
        value.trim().replace(/^"(.*)"$/, '$1')
      );

      // Create a mapping of header to value
      const data: { [key: string]: string } = {};
      headers.forEach((header, i) => {
        data[header] = values[i] || '';
      });

      return {
        id: `imported-${Date.now()}-${index}`,
        date: data['Date'],
        time: data['Time'] || new Date().toTimeString().split(' ')[0].slice(0, 5),
        pair: data['Pair'],
        type: (data['Type']?.toLowerCase() || 'long') as 'long' | 'short',
        entryPrice: parseFloat(data['Entry Price']) || 0,
        exitPrice: parseFloat(data['Exit Price']) || undefined,
        stopLoss: parseFloat(data['Stop Loss']) || undefined,
        takeProfit: parseFloat(data['Take Profit']) || undefined,
        size: parseFloat(data['Size']) || 0,
        pnl: parseFloat(data['PnL']) || 0,
        status: data['Status']?.toLowerCase() === 'closed' ? 'closed' : 'open',
        strategy: data['Strategy'] || 'Imported',
        marketType: (data['Market Type']?.toLowerCase() || 'crypto') as 'forex' | 'crypto' | 'stocks',
        exitType: data['Exit Type'] as 'tp' | 'sl' | undefined,
        notes: data['Notes'] || '',
        tags: (data['Tags'] || '').split(';').filter(Boolean)
      };
    }).filter((trade): trade is Trade => 
      Boolean(trade.pair && trade.entryPrice && trade.size)
    );
  } catch (error) {
    console.error('Error importing CSV:', error);
    throw new Error('Failed to import CSV. Please check the file format.');
  }
};