import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { filterPanelStyles as styles } from './FilterPanel.styled';

type Option = { label: string; value: string };

type Props = {
    STATUS_OPTIONS: Option[];
    SPECIES_OPTIONS: Option[];
    selectedStatus: string;
    setSelectedStatus: (v: string) => void;
    selectedSpecies: string;
    setSelectedSpecies: (v: string) => void;
    setStatus: (v: string) => void;
    setSpecies: (v: string) => void;
    setFilterVisible: (v: boolean) => void;
};

const Checkbox = ({ checked, onPress }: { checked: boolean; onPress: () => void }) => (
    <Pressable
        onPress={onPress}
        style={[
            styles.checkbox,
            { borderColor: checked ? '#162C1B' : '#DAE4DC', backgroundColor: checked ? '#162C1B' : '#fff' }
        ]}
    >
        {checked && <Icon name="check" size={12} color="#fff" />}
    </Pressable>
);

export const FilterPanel: React.FC<Props> = ({STATUS_OPTIONS, SPECIES_OPTIONS, selectedStatus, setSelectedStatus, selectedSpecies, setSelectedSpecies, setStatus, setSpecies, setFilterVisible,}) => (
    <View style={styles.panel}>
        <View style={styles.section}>
            <Text style={styles.sectionLabel}>Status</Text>
            <View style={styles.optionsColumn}>
                {STATUS_OPTIONS.map(opt => (
                    <View key={opt.value} style={styles.optionRow}>
                        <Checkbox
                            checked={selectedStatus === opt.value}
                            onPress={() => setSelectedStatus(selectedStatus === opt.value ? '' : opt.value)}
                        />
                        <Text style={styles.optionText}>{opt.label}</Text>
                    </View>
                ))}
            </View>
        </View>
        <View style={styles.section}>
            <Text style={styles.sectionLabel}>Species</Text>
            <View style={styles.optionsColumn}>
                {SPECIES_OPTIONS.map(opt => (
                    <View key={opt.value} style={styles.optionRow}>
                        <Checkbox
                            checked={selectedSpecies === opt.value}
                            onPress={() => setSelectedSpecies(selectedSpecies === opt.value ? '' : opt.value)}
                        />
                        <Text style={styles.optionText}>{opt.label}</Text>
                    </View>
                ))}
            </View>
        </View>
        <View style={styles.buttonsRow}>
            <Pressable
                style={styles.resetButton}
                onPress={() => {
                    setSelectedStatus('');
                    setSelectedSpecies('');
                    setStatus('');
                    setSpecies('');
                }}
            >
                <Text style={styles.resetButtonText}>RESET</Text>
            </Pressable>
            <Pressable
                style={styles.applyButton}
                onPress={() => {
                    setStatus(selectedStatus);
                    setSpecies(selectedSpecies);
                    setFilterVisible(false);
                }}
            >
                <Text style={styles.applyButtonText}>APPLY</Text>
            </Pressable>
        </View>
    </View>
);