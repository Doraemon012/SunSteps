// MasonryGrid.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = width / 2; // Adjust the width as needed

interface Item {
  id: string;
  uri: string;
  height: number;
}

const MasonryGrid: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const items = Array.from({ length: 20 }, (_, index) => ({
        id: index.toString(),
        uri: `https://picsum.photos/${imageWidth}/${Math.floor(Math.random() * 200) + 100}`,
        height: Math.floor(Math.random() * 300) + 100,
      }));
      setData(items);
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate the positions of items
  const calculateLayout = (data: Item[], columnCount: number) => {
    const columns = Array.from({ length: columnCount }, () => []);
    const columnHeights = Array.from({ length: columnCount }, () => 0);

    data.forEach((item) => {
      // Find the column with the smallest height
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));

      // Add item to the column
      columns[minHeightIndex].push({ ...item, top: columnHeights[minHeightIndex] });

      // Update column height
      columnHeights[minHeightIndex] += item.height;
    });

    return columns;
  };

  const renderItem = ({ item }: { item: Item & { top: number } }) => (
    <View style={[styles.imageContainer, { height: item.height, top: item.top }]}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );

  const columns = calculateLayout(data, 2);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.grid}>
          {columns.map((column, index) => (
            <View key={index} style={styles.column}>
              {column.map((item) => renderItem({ item }))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
  },
  grid: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  imageContainer: {
    margin: 5,
    overflow: 'hidden',
    borderRadius: 5,
    position: 'absolute',
    width: imageWidth - 10,
  },
  image: {
    width: imageWidth - 10,
    height: '100%',
    resizeMode: 'cover',
  },
});

export default MasonryGrid;
