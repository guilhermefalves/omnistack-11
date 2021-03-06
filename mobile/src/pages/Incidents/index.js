import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import logoImg from '../../assets/logo.png'

import api from '../../services/api'

export default function Incidents() {
    const navigation = useNavigation()

    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        // Se estiver buscando
        if (loading) {
            return;
        }

        // Se já alcançou o final da listagem
        if (total && incidents.length === total) {
            return;
        }

        try {
            setLoading(true)
            const response = await api.get(`incidents?page=${page}`);
            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers['x-total-count']);
            setPage(page + 1)
            setLoading(false)
        } catch(err) {
            Alert.alert('Erro', 'Ops, ocorreu um erro. Tente novamente')
        }
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>
                Bem-vindo!
            </Text>

            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia!
            </Text>

            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.4}
                showsVerticalScrollIndicator={false}
                renderItem={({item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>
                                Ver mais detalhes
                            </Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}